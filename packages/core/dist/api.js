var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BACKEND_URL = 'http://localhost:5000';
export class AuthApi {
    static sendMagicLink(email, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BACKEND_URL}/auth/magic-link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey
                },
                body: JSON.stringify({ email })
            });
            if (!res.ok) {
                const data = yield res.json();
                throw new Error(data.error || 'Failed to send magic link');
            }
        });
    }
    static verifyMagicLink(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BACKEND_URL}/auth/verify?token=${token}`);
            const data = yield res.json();
            if (!res.ok)
                throw new Error(data.error || 'Verification failed');
            return {
                token: data.token,
                user: data.user,
                expiresAt: Date.now() + 3600000
            };
        });
    }
    static login(email, password, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey
                },
                body: JSON.stringify({ email, password })
            });
            const data = yield res.json();
            if (!res.ok)
                throw new Error(data.error || 'Login failed');
            return data;
        });
    }
    static loginWithEmail(email, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sendMagicLink(email, apiKey);
        });
    }
    static signup(email, password, name, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BACKEND_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey
                },
                body: JSON.stringify({ email, password, name })
            });
            if (!res.ok) {
                const data = yield res.json();
                throw new Error(data.error || 'Signup failed');
            }
            return res.json();
        });
    }
    static socialLogin(provider, clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            window.location.href = `${BACKEND_URL}/auth/${provider}?state=${clientId}`;
        });
    }
    static verifyMFA(mfaToken, code, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BACKEND_URL}/auth/mfa/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey
                },
                body: JSON.stringify({ mfa_token: mfaToken, code })
            });
            const data = yield res.json();
            if (!res.ok)
                throw new Error(data.error || 'MFA verification failed');
            return data;
        });
    }
    static validateSession(token, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BACKEND_URL}/auth/session`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-API-KEY': apiKey
                }
            });
            if (!res.ok)
                throw new Error('Session invalid');
            const data = yield res.json();
            return {
                token,
                user: data.user,
                expiresAt: Date.now() + 3600000
            };
        });
    }
    static getTenant(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BACKEND_URL}/admin/me`, {
                headers: { 'X-API-KEY': apiKey }
            });
            if (!res.ok)
                throw new Error('Failed to fetch tenant info');
            return res.json();
        });
    }
    static upgradePlan(reference, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BACKEND_URL}/admin/upgrade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey
                },
                body: JSON.stringify({ reference })
            });
            const data = yield res.json();
            if (!res.ok)
                throw new Error(data.error || 'Upgrade failed');
            return data;
        });
    }
}
