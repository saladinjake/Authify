import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { db, initDb } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'authify-super-secret-key';

// KEY ROTATION (JWKS)
let activeKey = crypto.randomBytes(32).toString('hex');
const jwks = [{ kid: 'key-' + Date.now(), kty: 'oct', k: activeKey }];

function signJWT(payload: any, kid: string) {
    return jwt.sign(payload, activeKey, { expiresIn: '1h', keyid: kid });
}

function rotateKeys() {
    const newKey = crypto.randomBytes(32).toString('hex');
    const newKid = 'key-' + Date.now();
    activeKey = newKey;
    jwks.unshift({ kid: newKid, kty: 'oct', k: newKey });
    if (jwks.length > 3) jwks.pop(); // Keep only last 3 keys
    console.log(`[Authify] Keys rotated. New KID: ${newKid}`);
}

// Middleware: Multi-tenant Auth Guard & Rate Limiter
const tenantGuard = (req: any, res: any, next: any) => {
    const apiKey = req.headers['x-api-key'] || req.headers['X-API-KEY'] || req.query.api_key;
    if (!apiKey) return res.status(401).json({ error: 'MISSING_API_KEY' });

    db.get('SELECT * FROM tenants WHERE api_key = ?', [apiKey], (err: any, tenant: any) => {
        if (err || !tenant) return res.status(401).json({ error: 'INVALID_API_KEY' });

        // Rate Limiting Logic (FREE tier: 200 logins/signups)
        if (tenant.plan === 'free' && tenant.usage_count >= 200) {
            return res.status(402).json({
                error: 'RATE_LIMIT_EXCEEDED',
                message: 'Free tier limit reached. Please upgrade to a paid plan via the dashboard.'
            });
        }

        req.tenant = tenant;
        next();
    });
};

app.use(cors({
    origin: true, // Allow all for demo, in prod restrict to tenant.redirect_urls
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Passport setup (Google)
// Note: In a real multi-tenant app, you'd use the tenant's own Google credentials
// but for MVP we use our shared ones.
console.log('[Authify] Google Client ID:', process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.substring(0, 10) + '...' : 'Not Set');
console.log('[Authify] Callback URL:', `http://localhost:${PORT}/auth/google/callback`);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'DU_CLIENT_ID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'DUMMY_SECRET',
    callbackURL: `http://localhost:${PORT}/auth/google/callback`,
    passReqToCallback: true
},
    async (req: any, accessToken, refreshToken, profile, done) => {
        const email = profile.emails?.[0].value;
        const tenantId = req.query.state; // We use state to pass tenant_id through OAuth

        db.get('SELECT * FROM users WHERE email = ? AND tenant_id = ?', [email, tenantId], (err: any, user: any) => {
            if (user) return done(null, user);

            const newUser = {
                id: 'u_' + crypto.randomBytes(4).toString('hex'),
                tenant_id: tenantId,
                email,
                name: profile.displayName,
                avatar_url: profile.photos?.[0].value
            };

            db.run('INSERT INTO users (id, tenant_id, email, name, avatar_url) VALUES (?, ?, ?, ?, ?)',
                [newUser.id, newUser.tenant_id, newUser.email, newUser.name, newUser.avatar_url],
                () => done(null, newUser)
            );
        });
    }
));


app.post('/auth/signup', tenantGuard, async (req: any, res) => {
    const { email, password, name } = req.body;
    const tenant = req.tenant;

    const hashedPassword = await bcrypt.hash(password, 10);
    const uid = 'u_' + crypto.randomBytes(4).toString('hex');

    db.run('INSERT INTO users (id, tenant_id, email, password, name) VALUES (?, ?, ?, ?, ?)',
        [uid, tenant.id, email, hashedPassword, name],
        (err: any) => {
            if (err) return res.status(400).json({ error: 'USER_ALREADY_EXISTS' });

            // Increment usage
            db.run('UPDATE tenants SET usage_count = usage_count + 1 WHERE id = ?', [tenant.id]);

            const token = signJWT({ uid, tid: tenant.id }, jwks[0].kid);
            res.json({ token, user: { id: uid, email, name } });
        }
    );
});


app.post('/auth/login', tenantGuard, (req: any, res) => {
    const { email, password } = req.body;
    const tenant = req.tenant;

    db.get('SELECT * FROM users WHERE email = ? AND tenant_id = ?', [email, tenant.id], async (err: any, user: any) => {
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'INVALID_CREDENTIALS' });
        }

        // Check if MFA enabled for tenant or user
        if (tenant.mfa_enabled) {
            return res.json({
                mfa_required: true,
                mfa_token: jwt.sign({ uid: user.id, tid: tenant.id }, JWT_SECRET, { expiresIn: '5m' })
            });
        }

        // Increment usage
        db.run('UPDATE tenants SET usage_count = usage_count + 1 WHERE id = ?', [tenant.id]);

        const token = signJWT({ uid: user.id, tid: tenant.id }, jwks[0].kid);
        res.json({ token, user });
    });
});

// Google OAuth Routes
app.get('/auth/google', (req: any, res, next) => {
    const { api_key, state } = req.query; // state should be the tenant_id or redirect_uri
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: state || api_key
    })(req, res, next);
});

app.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login?error=oauth_failed' }),
    (req: any, res) => {
        const user = req.user;
        const tenantId = req.query.state;
        const token = signJWT({ uid: user.id, tid: tenantId }, jwks[0].kid);

        // Redirect back to frontend with token
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
    }
);

// Magic Link Route
app.post('/auth/magic-link', tenantGuard, (req: any, res) => {
    const { email } = req.body;
    const tenant = req.tenant;

    // In a real app, send an email. For MVP, we just return the link or simulate success.
    const token = jwt.sign({ email, tid: tenant.id }, JWT_SECRET, { expiresIn: '15m' });
    console.log(`[Authify] Magic Link generated for ${email}: /auth/verify?token=${token}`);

    res.json({ message: 'MAGIC_LINK_SENT', debug_token: token });
});

app.get('/auth/verify', (req: any, res) => {
    const { token } = req.query;
    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);

        db.get('SELECT * FROM users WHERE email = ? AND tenant_id = ?', [decoded.email, decoded.tid], (err: any, user: any) => {
            if (!user) {
                // Auto-signup if user doesn't exist? (Optional behavior)
                const uid = 'u_' + crypto.randomBytes(4).toString('hex');
                db.run('INSERT INTO users (id, tenant_id, email, name) VALUES (?, ?, ?, ?)',
                    [uid, decoded.tid, decoded.email, decoded.email.split('@')[0]],
                    () => {
                        const authToken = signJWT({ uid, tid: decoded.tid }, jwks[0].kid);
                        res.json({ token: authToken, user: { id: uid, email: decoded.email } });
                    }
                );
            } else {
                const authToken = signJWT({ uid: user.id, tid: decoded.tid }, jwks[0].kid);
                res.json({ token: authToken, user });
            }
        });
    } catch (e) {
        res.status(401).json({ error: 'INVALID_OR_EXPIRED_TOKEN' });
    }
});

// 2.1 MFA Verify
app.post('/auth/mfa/verify', tenantGuard, (req: any, res) => {
    const { mfa_token, code } = req.body;
    const tenant = req.tenant;

    try {
        const decoded: any = jwt.verify(mfa_token, JWT_SECRET);

        // Simulation: any 6 digit code works
        if (code.length !== 6) return res.status(400).json({ error: 'INVALID_MFA_CODE' });

        db.get('SELECT * FROM users WHERE id = ?', [decoded.uid], (err: any, user: any) => {
            db.run('UPDATE tenants SET usage_count = usage_count + 1 WHERE id = ?', [tenant.id]);
            const token = signJWT({ uid: decoded.uid, tid: tenant.id }, jwks[0].kid);
            res.json({ token, user });
        });
    } catch (e) {
        res.status(401).json({ error: 'EXPIRED_MFA_TOKEN' });
    }
});


app.post('/admin/upgrade', tenantGuard, (req: any, res) => {
    const tenant = req.tenant;
    // tODO HERE WE NEED TO ADD PAYSTACK TRANSACTION IN THE NEXT PLAN
    const { reference } = req.body;

    if (reference) {
        db.run('UPDATE tenants SET plan = "pro", usage_count = 0 WHERE id = ?', [tenant.id], () => {
            res.json({ message: 'Upgraded to PRO successfully', plan: 'pro' });
        });
    } else {
        res.status(400).json({ error: 'PAYMENT_FAILED' });
    }
});

// 6. Manual Key Rotation
app.post('/admin/rotate-keys', tenantGuard, (req, res) => {
    rotateKeys();
    res.json({ message: 'Keys rotated', current_kid: jwks[0].kid });
});

// 3. JWKS
app.get('/.well-known/jwks.json', (req, res) => {
    res.json({ keys: jwks });
});

// 4. Session Verification
app.get('/auth/session', tenantGuard, (req: any, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'NO_TOKEN_PROVIDED' });

    const token = authHeader.split(' ')[1];
    try {
        // Decode header to find Key ID (kid)
        const decodedToken: any = jwt.decode(token, { complete: true });
        const kid = decodedToken?.header?.kid;

        // Find matching key in JWKS or fallback to activeKey
        // Assuming JWT_SECRET is the fallback or primary secret if kid is not found or jwks is empty
        const signingKey = jwks.find(k => k.kid === kid)?.k || JWT_SECRET;

        const decoded: any = jwt.verify(token, signingKey);

        db.get('SELECT * FROM users WHERE id = ?', [decoded.uid], (err: any, user: any) => {
            if (err || !user) return res.status(401).json({ error: 'INVALID_SESSION' });
            res.json({ user });
        });
    } catch (e: any) {
        console.error('AuthSession Verification failed:', e.message);
        res.status(401).json({ error: 'INVALID_TOKEN' });
    }
});

// 5. Tenant Info (for Dashboard)
app.get('/admin/me', tenantGuard, (req: any, res) => {
    res.json(req.tenant);
});

// Start Server
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`\n🚀 Authify Enterprise Backend running on http://localhost:${PORT}`);
        console.log(`Default Dev Tenant API Key: dev_api_key_123`);
    });
});
