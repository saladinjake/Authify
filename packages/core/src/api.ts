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



}
