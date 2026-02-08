export type User = {
    id: string;
    email: string;
    name?: string;
    avatarUrl?: string;
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

