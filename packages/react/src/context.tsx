import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createAuthify, AuthClient, AuthConfig, AuthState } from '@authify/core';

const AuthContext = createContext<AuthClient | null>(null);
const AuthStateContext = createContext<AuthState | null>(null);

interface AuthifyProviderProps {
    children: ReactNode;
    client?: AuthClient; // Pass existing client
    config?: AuthConfig; // OR pass config to create one
}

export const AuthifyProvider = ({ children, client, config }: AuthifyProviderProps) => {
    const [authClient] = useState(() => {
        if (client) return client;
        if (config) return createAuthify(config);
        throw new Error('AuthifyProvider requires either client or config.');
    });

    const [state, setState] = useState<AuthState>(authClient.state);

    useEffect(() => {
        // Subscribe to store updates
        const unsubscribe = authClient.subscribe((newState) => {
            setState(newState);
        });
        return () => unsubscribe();
    }, [authClient]);

    return (
        <AuthContext.Provider value={authClient}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthContext.Provider>
    );
};

export const useAuthClient = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthClient must be used within an AuthifyProvider');
    }
    return context;
};

export const useAuthState = () => {
    const context = useContext(AuthStateContext);
    if (!context) {
        throw new Error('useAuthState must be used within an AuthifyProvider');
    }
    return context;
};
