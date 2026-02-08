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



app.use(cors({
    origin: true, // Allow all for demo, in prod restrict to tenant.redirect_urls
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


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

// Start Server
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`\n Authify Enterprise Backend running on http://localhost:${PORT}`);
        console.log(`Default Dev Tenant API Key: dev_api_key_123`);
    });
});
