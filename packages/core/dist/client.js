var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AuthStore } from './store';
import { AuthApi } from './api';
export class AuthClient {
    constructor(config) {
        this.config = config;
        this.store = new AuthStore(config.apiKey);
        this.applyTheme();
    }
    applyTheme() {
        if (!this.config.theme || typeof document === 'undefined')
            return;
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
    subscribe(cb) {
        return this.store.subscribe(cb);
    }
    get state() {
        return this.store.getState();
    }
    signInWithEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.store.setError(null);
                console.log(`[Authify] Sending magic link to ${email} via ${this.config.domain}...`);
                yield AuthApi.sendMagicLink(email, this.config.apiKey);
                this.store.setAwaitingVerification();
            }
            catch (err) {
                this.store.setError(err.message || 'Failed to send magic link');
                throw err;
            }
        });
    }
    verifyMagicLink(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.store.setError(null);
                console.log(`[Authify] Verifying token...`);
                const session = yield AuthApi.verifyMagicLink(token);
                this.store.setSession(session);
            }
            catch (err) {
                this.store.setError(err.message || 'Verification failed');
                throw err;
            }
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Authify] Signing out...');
            yield new Promise(resolve => setTimeout(resolve, 300));
            this.store.clearSession();
        });
    }
    signInWithProvider(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.store.setError(null);
                console.log(`[Authify] Redirecting to ${provider}...`);
                yield AuthApi.socialLogin(provider, this.config.clientId);
            }
            catch (err) {
                this.store.setError(err.message || 'Social login failed');
                throw err;
            }
        });
    }
    signIn(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.store.setError(null);
                if (!credentials.password) {
                    return this.signInWithEmail(credentials.email);
                }
                const response = yield AuthApi.login(credentials.email, credentials.password, this.config.apiKey);
                if (response.mfa_required) {
                    this.store.setMFAChallenge({ token: response.mfa_token, type: 'totp' });
                    return;
                }
                this.store.setSession(response);
            }
            catch (err) {
                this.store.setError(err.message || 'Login failed');
                throw err;
            }
        });
    }
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.store.setError(null);
                if (!data.password) {
                    return this.signInWithEmail(data.email);
                }
                const response = yield AuthApi.signup(data.email, data.password, data.name, this.config.apiKey);
                if (response.mfa_required) {
                    this.store.setMFAChallenge({ token: response.mfa_token, type: 'totp' });
                    return;
                }
                this.store.setSession(response);
            }
            catch (err) {
                this.store.setError(err.message || 'Signup failed');
                throw err;
            }
        });
    }
    verifyMFA(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.store.setError(null);
                const state = this.store.getState();
                if (state.status !== 'mfa_challenge' || !state.mfaChallenge) {
                    throw new Error('No active MFA challenge');
                }
                const session = yield AuthApi.verifyMFA(state.mfaChallenge.token, code, this.config.apiKey);
                this.store.setSession(session);
            }
            catch (err) {
                this.store.setError(err.message || 'MFA verification failed');
                throw err;
            }
        });
    }
}
export function createAuthify(config) {
    return new AuthClient(config);
}
