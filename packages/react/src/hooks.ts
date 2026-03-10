import { useAuthClient, useAuthState } from './context';
import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
    const client = useAuthClient();
    const state = useAuthState();

    const signIn = useCallback((email: string) => client.signInWithEmail(email), [client]);
    const signOut = useCallback(() => client.signOut(), [client]);
    const signInWithProvider = useCallback((provider: 'google' | 'github') => client.signInWithProvider(provider), [client]);

    const verifyMFA = useCallback((code: string) => client.verifyMFA(code), [client]);

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
            // Verify token if needed or leave it to dev. But the backend `/auth/google/callback`
            // signs a JWT. We can use it as session token. 
            // In fact, verifyMagicLink endpoint works for any valid JWT according to the backend `/auth/verify` route!
            client.verifyMagicLink(urlToken).catch(console.error);
            
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [client]);

    return { login, signup, token };
};
