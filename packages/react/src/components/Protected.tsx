import React, { ReactNode } from 'react';
import { useAuth } from '../hooks';

interface ProtectedProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export const Protected = ({ children, fallback }: ProtectedProps) => {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        // Optional: Default loading state or nothing
        return null;
    }

    if (!isSignedIn) {
        return <>{fallback || null}</>;
    }

    return <>{children}</>;
};
