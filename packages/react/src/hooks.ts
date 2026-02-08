import { useAuthClient, useAuthState } from './context';
import { useCallback } from 'react';

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
