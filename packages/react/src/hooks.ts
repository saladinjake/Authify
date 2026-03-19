import { useAuthClient, useAuthState } from './context';
import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
    const client = useAuthClient();
    const state = useAuthState();

    const signIn = useCallback((emailOrCreds: string | { email: string; password?: string }) => {
        if (typeof emailOrCreds === 'string') {
            return client.signInWithEmail(emailOrCreds);
        }
        return client.signIn(emailOrCreds);
    }, [client]);
    const signOut = useCallback(() => client.signOut(), [client]);
    const signInWithProvider = useCallback((provider: 'google' | 'github') => client.signInWithProvider(provider), [client]);

    const verifyMFA = useCallback((code: string) => client.verifyMFA(code), [client]);
    const forgotPassword = useCallback((email: string) => client.forgotPassword(email), [client]);
    const verifyResetCode = useCallback((email: string, code: string) => client.verifyResetCode(email, code), [client]);
    const resetPassword = useCallback((email: string, code: string, pass: string) => client.resetPassword(email, code, pass), [client]);

    return {
        status: state.status,
        isLoaded: state.status !== 'loading',
        isSignedIn: state.status === 'authenticated',
        isAwaitingVerification: state.status === 'awaiting_verification',
        isMFAChallenge: state.status === 'mfa_challenge',
        mfaChallenge: state.mfaChallenge,
        user: state.user,
        session: state.session,
        error: state.error,
        signIn,
        signOut,
        signInWithProvider,
        verifyMFA,
        forgotPassword,
        verifyResetCode,
        resetPassword,
    };
};

export const useUser = () => {
    const { user, isSignedIn, isLoaded } = useAuth();
    return { user, isSignedIn, isLoaded };
};

export const useGoogleAuth = () => {
    const client = useAuthClient();
    const [token, setToken] = useState<string | null>(null);

    const login = useCallback(() => client.signInWithProvider('google'), [client]);
    const signup = useCallback(() => client.signInWithProvider('google'), [client]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        
        if (urlToken) {
            setToken(urlToken);
            client.verifyMagicLink(urlToken).catch(console.error);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [client]);

    return { login, signup, token };
};
