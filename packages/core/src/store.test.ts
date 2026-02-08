import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthStore } from './store';
import { AuthApi } from './api';

vi.mock('./api');

describe('AuthStore', () => {
    let store: AuthStore;

    beforeEach(() => {
        vi.clearAllMocks();
        // Mock localStorage
        const store: Record<string, string> | any = {};
        vi.stubGlobal('localStorage', {
            getItem: (key: string) => store[key] || null,
            setItem: (key: string, value: string) => { store[key] = value; },
            removeItem: (key: string) => { delete store[key]; },
            clear: () => { for (const key in store) delete store[key]; }
        });

        // Mock window.location
        vi.stubGlobal('location', { search: '', pathname: '/' });
        vi.stubGlobal('history', { replaceState: vi.fn() });

        store = new AuthStore('test_api_key');
    });


});
