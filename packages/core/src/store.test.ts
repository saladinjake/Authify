import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthStore } from './store';
import { AuthApi } from './api';

vi.mock('./api');

describe('AuthStore', () => {
    let store!: AuthStore;

    beforeEach(() => {
        vi.clearAllMocks();
        // Mock localStorage
        const mockStorage: Record<string, string> | any = {};
        vi.stubGlobal('localStorage', {
            getItem: (key: string) => mockStorage[key] || null,
            setItem: (key: string, value: string) => { mockStorage[key] = value; },
            removeItem: (key: string) => { delete mockStorage[key]; },
            clear: () => { for (const key in mockStorage) delete mockStorage[key]; }
        });

        vi.stubGlobal('location', { search: '', pathname: '/' });
        vi.stubGlobal('history', { replaceState: vi.fn() });

        store = new AuthStore('test_api_key');
    });

    it('should initialize with loading status then unauthenticated', async () => {
        expect(store.getState().status).toBe('loading');

        // Wait for hydrate timeout
        await new Promise(r => setTimeout(r, 150));
        expect(store.getState().status).toBe('unauthenticated');
    });

    it('should set session and persist to localStorage', () => {
        const mockSession = {
            token: 't123',
            user: { id: 'u1', email: 'test@example.com' },
            expiresAt: Date.now() + 3600
        };

        store.setSession(mockSession);

        expect(store.getState().status).toBe('authenticated');
        expect(localStorage.getItem('authify_session')).toContain('t123');
    });

    it('should clear session', () => {
        store.clearSession();
        expect(store.getState().status).toBe('unauthenticated');
        expect(localStorage.getItem('authify_session')).toBeNull();
    });
});
