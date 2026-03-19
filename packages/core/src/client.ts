import { AuthConfig, User, AuthSession } from './types';
import { AuthStore } from './store';
import { AuthApi } from './api';

export class AuthClient {
    private store: AuthStore;
    private config: AuthConfig;

    constructor(config: AuthConfig) {
        this.config = config;
        if (config.domain) {
            AuthApi.setUrl(config.domain);
        }
        this.store = new AuthStore(config.apiKey);
        this.applyTheme();
    }

    private applyTheme() {
        if (!this.config.theme || typeof document === 'undefined') return;

        const { theme } = this.config;
        const root = document.documentElement;

        if (theme.primaryColor) {
            root.style.setProperty('--authify-primary-color', theme.primaryColor);
            root.style.setProperty('--authify-btn-primary-bg', theme.primaryColor);
        }
        if (theme.borderRadius) {
            root.style.setProperty('--authify-radius', theme.borderRadius);
        }
        if (theme.fontFamily) {
            root.style.setProperty('--authify-font-family', theme.fontFamily);
        }
    }

    subscribe(cb: (state: ReturnType<AuthStore['getState']>) => void) {
        return this.store.subscribe(cb);
    }

    get state() {
        return this.store.getState();
    }

    getConfig() {
        return this.config;
    }

    async signInWithEmail(email: string): Promise<void> {
        try {
            this.store.setError(null);
            console.log(`[Authify] Sending magic link to ${email} via ${this.config.domain}...`);

            await AuthApi.sendMagicLink(email, this.config.apiKey);
            this.store.setAwaitingVerification();
        } catch (err: any) {
            this.store.setError(err.message || 'Failed to send magic link');
            throw err;
        }
    }

    async verifyMagicLink(token: string): Promise<void> {
        try {
            this.store.setError(null);
            console.log(`[Authify] Verifying token...`);
            const session = await AuthApi.verifyMagicLink(token);
            this.store.setSession(session);
        } catch (err: any) {
            this.store.setError(err.message || 'Verification failed');
            throw err;
        }
    }

    async signOut(): Promise<void> {
        console.log('[Authify] Signing out...');
        await new Promise(resolve => setTimeout(resolve, 300));
        this.store.clearSession();
    }

    async signInWithProvider(provider: 'google' | 'github'): Promise<void> {
        try {
            this.store.setError(null);
            console.log(`[Authify] Redirecting to ${provider}...`);
            await AuthApi.socialLogin(provider, this.config.clientId, {
                googleClientId: this.config.googleClientId,
                googleClientSecret: this.config.googleClientSecret,
                googleCallbackUrl: this.config.googleCallbackUrl,
                githubClientId: this.config.githubClientId,
                githubClientSecret: this.config.githubClientSecret,
                githubCallbackUrl: this.config.githubCallbackUrl,
                apiKey: this.config.apiKey
            });
        } catch (err: any) {
            this.store.setError(err.message || 'Social login failed');
            throw err;
        }
    }

    async signIn(credentials: { email: string; password?: string }): Promise<void> {
        try {
            this.store.setError(null);
            if (!credentials.password) {
                return this.signInWithEmail(credentials.email);
            }
            const response = await AuthApi.login(credentials.email, credentials.password, this.config.apiKey);

            if (response.mfa_required) {
                this.store.setMFAChallenge({ token: response.mfa_token, type: 'totp' });
                return;
            }

            this.store.setSession(response);
        } catch (err: any) {
            this.store.setError(err.message || 'Login failed');
            throw err;
        }
    }

    async signUp(data: { email: string; password?: string; name: string }): Promise<void> {
        try {
            this.store.setError(null);
            if (!data.password) {
                return this.signInWithEmail(data.email);
            }
            const response = await AuthApi.signup(data.email, data.password, data.name, this.config.apiKey);

            if (response.mfa_required) {
                this.store.setMFAChallenge({ token: response.mfa_token, type: 'totp' });
                return;
            }

            this.store.setSession(response);
        } catch (err: any) {
            this.store.setError(err.message || 'Signup failed');
            throw err;
        }
    }

    async verifyMFA(code: string): Promise<void> {
        try {
            this.store.setError(null);
            const state = this.store.getState();
            if (state.status !== 'mfa_challenge' || !state.mfaChallenge) {
                throw new Error('No active MFA challenge');
            }

            const session = await AuthApi.verifyMFA(state.mfaChallenge.token, code, this.config.apiKey);
            this.store.setSession(session);
        } catch (err: any) {
            this.store.setError(err.message || 'MFA verification failed');
            throw err;
        }
    }

    async forgotPassword(email: string): Promise<void> {
        try {
            this.store.setError(null);
            await AuthApi.forgotPassword(email, this.config.apiKey);
        } catch (err: any) {
            this.store.setError(err.message || 'Failed to send reset code');
            throw err;
        }
    }

    async verifyResetCode(email: string, code: string): Promise<void> {
        try {
            this.store.setError(null);
            await AuthApi.verifyResetCode(email, code, this.config.apiKey);
        } catch (err: any) {
            this.store.setError(err.message || 'Invalid or expired code');
            throw err;
        }
    }

    async resetPassword(email: string, code: string, newPassword: string): Promise<void> {
        try {
            this.store.setError(null);
            await AuthApi.resetPassword(email, code, newPassword, this.config.apiKey);
        } catch (err: any) {
            this.store.setError(err.message || 'Failed to reset password');
            throw err;
        }
    }
}

export function createAuthify(config: AuthConfig) {
    return new AuthClient(config);
}
