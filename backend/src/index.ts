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
    const apiKey = req.headers['x-api-key'] || req.query.api_key;
    if (!apiKey) return res.status(401).json({ error: 'MISSING_API_KEY' });

    db.get('SELECT * FROM tenants WHERE api_key = ?', [apiKey], (err, tenant: any) => {
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

// Passport setup (Google)
// Note: In a real multi-tenant app, you'd use the tenant's own Google credentials
// but for MVP we use our shared ones.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'DU_CLIENT_ID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'DUMMY_SECRET',
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
},
    async (req: any, accessToken, refreshToken, profile, done) => {
        const email = profile.emails?.[0].value;
        const tenantId = req.query.state; // We use state to pass tenant_id through OAuth

        db.get('SELECT * FROM users WHERE email = ? AND tenant_id = ?', [email, tenantId], (err, user: any) => {
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
        (err) => {
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

    db.get('SELECT * FROM users WHERE email = ? AND tenant_id = ?', [email, tenant.id], async (err, user: any) => {
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

// 4. Tenant Info (for Dashboard)
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
