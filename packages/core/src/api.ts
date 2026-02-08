import { User, AuthSession } from './types';

const BACKEND_URL = 'http://localhost:5000';

export class AuthApi {
    static async sendMagicLink(email: string, apiKey: string): Promise<void> {
        const res = await fetch(`${BACKEND_URL}/auth/magic-link`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            body: JSON.stringify({ email })
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to send magic link');
        }
    }

    static async verifyMagicLink(token: string): Promise<AuthSession> {
        const res = await fetch(`${BACKEND_URL}/auth/verify?token=${token}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Verification failed');

        return {
            token: data.token,
            user: data.user,
            expiresAt: Date.now() + 3600000
        };
    }

    static async login(email: string, password: string, apiKey: string): Promise<any> {
        const res = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        return data;
    }

    static async loginWithEmail(email: string, apiKey: string): Promise<void> {
        return this.sendMagicLink(email, apiKey);
    }

    static async signup(email: string, password: string, name: string, apiKey: string): Promise<any> {
        const res = await fetch(`${BACKEND_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            body: JSON.stringify({ email, password, name })
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Signup failed');
        }
        return res.json();
    }

    static async socialLogin(provider: string, clientId: string): Promise<void> {

        window.location.href = `${BACKEND_URL}/auth/${provider}?state=${clientId}`;
    }

    static async verifyMFA(mfaToken: string, code: string, apiKey: string): Promise<AuthSession> {
        const res = await fetch(`${BACKEND_URL}/auth/mfa/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            body: JSON.stringify({ mfa_token: mfaToken, code })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'MFA verification failed');
        return data;
    }

    static async validateSession(token: string, apiKey: string): Promise<AuthSession> {
        const res = await fetch(`${BACKEND_URL}/auth/session`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-API-KEY': apiKey
            }
        });

        if (!res.ok) throw new Error('Session invalid');
        const data = await res.json();

        return {
            token,
            user: data.user,
            expiresAt: Date.now() + 3600000
        };
    }

    static async getTenant(apiKey: string): Promise<any> {
        const res = await fetch(`${BACKEND_URL}/admin/me`, {
            headers: { 'X-API-KEY': apiKey }
        });
        if (!res.ok) throw new Error('Failed to fetch tenant info');
        return res.json();
    }

    static async upgradePlan(reference: string, apiKey: string): Promise<any> {
        const res = await fetch(`${BACKEND_URL}/admin/upgrade`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            body: JSON.stringify({ reference })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upgrade failed');
        return data;
    }
}
