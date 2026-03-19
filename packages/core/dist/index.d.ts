type User = {
    id: string;
    email: string;
    name?: string;
    avatarUrl?: string;
    role?: 'admin' | 'user';
};
type AuthSession = {
    token: string;
    user: User;
    expiresAt: number;
};
type AuthStatus = 'loading' | 'unauthenticated' | 'authenticated' | 'awaiting_verification' | 'mfa_challenge';
interface MFAChallenge {
    token: string;
    type: 'totp' | 'email' | 'sms';
}
interface AuthState {
    status: AuthStatus;
    user: User | null;
    session: AuthSession | null;
    error: string | null;
    mfaChallenge?: MFAChallenge | null;
}
interface AuthTheme {
    primaryColor?: string;
    borderRadius?: string;
    fontFamily?: string;
}
interface AuthConfig {
    clientId: string;
    apiKey: string;
    domain: string;
    googleClientId?: string;
    googleClientSecret?: string;
    googleCallbackUrl?: string;
    githubClientId?: string;
    githubClientSecret?: string;
    githubCallbackUrl?: string;
    theme?: AuthTheme;
}

type Listener = (state: AuthState) => void;
declare class AuthStore {
    private state;
    private apiKey;
    private listeners;
    constructor(apiKey?: string);
    setMFAChallenge(challenge: MFAChallenge): void;
    getState(): AuthState;
    subscribe(listener: Listener): () => void;
    private setState;
    private notify;
    private hydrate;
    setSession(session: AuthSession): void;
    clearSession(): void;
    setAwaitingVerification(): void;
    setError(error: string | null): void;
}
declare const createStore: (apiKey?: string) => AuthStore;

declare class AuthClient {
    private store;
    private config;
    constructor(config: AuthConfig);
    private applyTheme;
    subscribe(cb: (state: ReturnType<AuthStore['getState']>) => void): () => void;
    get state(): AuthState;
    getConfig(): AuthConfig;
    signInWithEmail(email: string): Promise<void>;
    verifyMagicLink(token: string): Promise<void>;
    signOut(): Promise<void>;
    signInWithProvider(provider: 'google' | 'github'): Promise<void>;
    signIn(credentials: {
        email: string;
        password?: string;
    }): Promise<void>;
    signUp(data: {
        email: string;
        password?: string;
        name: string;
    }): Promise<void>;
    verifyMFA(code: string): Promise<void>;
    forgotPassword(email: string): Promise<void>;
    verifyResetCode(email: string, code: string): Promise<void>;
    resetPassword(email: string, code: string, newPassword: string): Promise<void>;
}
declare function createAuthify(config: AuthConfig): AuthClient;

declare class AuthApi {
    static setUrl(url: string): void;
    static sendMagicLink(email: string, apiKey: string): Promise<void>;
    static verifyMagicLink(token: string): Promise<AuthSession>;
    static login(email: string, password: string, apiKey: string): Promise<any>;
    static loginWithEmail(email: string, apiKey: string): Promise<void>;
    static signup(email: string, password: string, name: string, apiKey: string): Promise<any>;
    static socialLogin(provider: string, clientId: string, extra?: {
        googleClientId?: string;
        googleClientSecret?: string;
        googleCallbackUrl?: string;
        githubClientId?: string;
        githubClientSecret?: string;
        githubCallbackUrl?: string;
        apiKey?: string;
    }): Promise<void>;
    static verifyMFA(mfaToken: string, code: string, apiKey: string): Promise<AuthSession>;
    static validateSession(token: string, apiKey: string): Promise<AuthSession>;
    static getTenant(apiKey: string): Promise<any>;
    static upgradePlan(reference: string, apiKey: string): Promise<any>;
    static forgotPassword(email: string, apiKey: string): Promise<void>;
    static verifyResetCode(email: string, code: string, apiKey: string): Promise<void>;
    static resetPassword(email: string, code: string, newPassword: string, apiKey: string): Promise<void>;
}

export { AuthApi, AuthClient, type AuthConfig, type AuthSession, type AuthState, type AuthStatus, AuthStore, type AuthTheme, type MFAChallenge, type User, createAuthify, createStore };
