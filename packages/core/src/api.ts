import { User, AuthSession } from './types';

let BACKEND_URL = 'http://localhost:5000';

export class AuthApi {
    static setUrl(url: string) {
        BACKEND_URL = url.startsWith('http') ? url : `http://${url}`;
    }

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

    static async socialLogin(provider: string, clientId: string, extra?: {
        googleClientId?: string;
        googleClientSecret?: string;
        googleCallbackUrl?: string;
        githubClientId?: string;
        githubClientSecret?: string;
        githubCallbackUrl?: string;
        apiKey?: string;
    }): Promise<void> {
        // Try to use headers first (Secure & Clean)
        try {
            const headers: Record<string, string> = {
                'X-API-KEY': extra?.apiKey || '',
                'X-STATE': clientId
            };

            if (extra?.googleClientId) headers['X-GOOGLE-CLIENT-ID'] = extra.googleClientId;
            if (extra?.googleClientSecret) headers['X-GOOGLE-CLIENT-SECRET'] = extra.googleClientSecret;
            if (extra?.googleCallbackUrl) headers['X-GOOGLE-CALLBACK-URL'] = extra.googleCallbackUrl;
            
            if (extra?.githubClientId) headers['X-GITHUB-CLIENT-ID'] = extra.githubClientId;
            if (extra?.githubClientSecret) headers['X-GITHUB-CLIENT-SECRET'] = extra.githubClientSecret;
            if (extra?.githubCallbackUrl) headers['X-GITHUB-CALLBACK-URL'] = extra.githubCallbackUrl;

            const res = await fetch(`${BACKEND_URL}/auth/${provider}`, {
                method: 'POST',
                headers
            });

            if (res.ok) {
                const data = await res.json();
                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                    return;
                }
            }
        } catch (err) {
            console.warn('[Authify] Header-based auth initiation failed, falling back to query params', err);
        }

        // Fallback: Query parameters
        let url = `${BACKEND_URL}/auth/${provider}?state=${encodeURIComponent(clientId)}`;

        if (extra?.apiKey) {
            url += `&api_key=${encodeURIComponent(extra.apiKey)}`;
        }

        if (provider === 'google' && extra) {
            if (extra.googleClientId) url += `&google_client_id=${encodeURIComponent(extra.googleClientId)}`;
            if (extra.googleClientSecret) url += `&google_client_secret=${encodeURIComponent(extra.googleClientSecret)}`;
            if (extra.googleCallbackUrl) url += `&google_callback_url=${encodeURIComponent(extra.googleCallbackUrl)}`;
        }

        if (provider === 'github' && extra) {
            if (extra.githubClientId) url += `&github_client_id=${encodeURIComponent(extra.githubClientId)}`;
            if (extra.githubClientSecret) url += `&github_client_secret=${encodeURIComponent(extra.githubClientSecret)}`;
            if (extra.githubCallbackUrl) url += `&github_callback_url=${encodeURIComponent(extra.githubCallbackUrl)}`;
        }

        window.location.href = url;
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

    static async forgotPassword(email: string, apiKey: string): Promise<void> {
        const res = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            body: JSON.stringify({ email })
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to send reset code');
        }
    }

    static async verifyResetCode(email: string, code: string, apiKey: string): Promise<void> {
        const res = await fetch(`${BACKEND_URL}/auth/verify-reset-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            body: JSON.stringify({ email, code })
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Invalid or expired code');
        }
    }

    static async resetPassword(email: string, code: string, newPassword: string, apiKey: string): Promise<void> {
        const res = await fetch(`${BACKEND_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            body: JSON.stringify({ email, code, newPassword })
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to reset password');
        }
    }
}
