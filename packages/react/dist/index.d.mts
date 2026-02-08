import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import * as _authify_core from '@authify/core';
import { AuthClient, AuthConfig, AuthState } from '@authify/core';

interface AuthifyProviderProps {
    children: ReactNode;
    client?: AuthClient;
    config?: AuthConfig;
}
declare const AuthifyProvider: ({ children, client, config }: AuthifyProviderProps) => react_jsx_runtime.JSX.Element;
declare const useAuthClient: () => AuthClient;
declare const useAuthState: () => AuthState;

declare const useAuth: () => {
    status: _authify_core.AuthStatus;
    isLoaded: boolean;
    isSignedIn: boolean;
    isAwaitingVerification: boolean;
    isMFAChallenge: boolean;
    mfaChallenge: _authify_core.MFAChallenge | null | undefined;
    user: _authify_core.User | null;
    session: _authify_core.AuthSession | null;
    error: string | null;
    signIn: (email: string) => Promise<void>;
    signOut: () => Promise<void>;
    signInWithProvider: (provider: "google" | "github") => Promise<void>;
    verifyMFA: (code: string) => Promise<void>;
};
declare const useUser: () => {
    user: _authify_core.User | null;
    isSignedIn: boolean;
    isLoaded: boolean;
};

declare const SignIn: () => react_jsx_runtime.JSX.Element;

declare const UserButton: () => react_jsx_runtime.JSX.Element | null;

interface ProtectedProps {
    children: ReactNode;
    fallback?: ReactNode;
}
declare const Protected: ({ children, fallback }: ProtectedProps) => react_jsx_runtime.JSX.Element | null;

declare const UserProfile: () => react_jsx_runtime.JSX.Element | null;

export { AuthifyProvider, Protected, SignIn, UserButton, UserProfile, useAuth, useAuthClient, useAuthState, useUser };
