export type User = {
    id: string;
    email: string;
    name?: string;
    avatarUrl?: string;
    role?: 'admin' | 'user';
};

export type AuthSession = {
    token: string;
    user: User;
    expiresAt: number;
};

export type AuthStatus = 'loading' | 'unauthenticated' | 'authenticated' | 'awaiting_verification' | 'mfa_challenge';

export interface MFAChallenge {
    token: string;
    type: 'totp' | 'email' | 'sms';
}

export interface AuthState {
    status: AuthStatus;
    user: User | null;
    session: AuthSession | null;
    error: string | null;
    mfaChallenge?: MFAChallenge | null;
}

export interface AuthTheme {
    primaryColor?: string;
    borderRadius?: string;
    fontFamily?: string;
}

export interface AuthConfig {
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
