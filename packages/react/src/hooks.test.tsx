import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../src/hooks';
import { AuthifyProvider } from '../src/context';
import React, { ReactNode } from 'react';

// Mock core
vi.mock('@authify/core', () => ({
    createAuthify: vi.fn(() => ({
        state: { status: 'unauthenticated', user: null, session: null, error: null },
        subscribe: vi.fn(() => vi.fn()),
        signInWithEmail: vi.fn(),
        signOut: vi.fn(),
        signInWithProvider: vi.fn(),
    })),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthifyProvider config={{ clientId: 'test', domain: 'test' }}>
        {children}
    </AuthifyProvider>
);

describe('useAuth hook', () => {
    it('should return initial auth state', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });
        expect(result.current.isSignedIn).toBe(false);
        expect(result.current.isLoaded).toBe(true);
    });
});
