import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthApi } from './api';

// Mock global fetch
global.fetch = vi.fn();

describe('AuthApi', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should send magic link', async () => {
        (fetch as any).mockResolvedValue({
            ok: true,
            json: async () => ({ message: 'MAGIC_LINK_SENT' })
        });

        await AuthApi.sendMagicLink('test@example.com', 'test_key');
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/magic-link'), expect.any(Object));
    });

    it('should verify magic link and return session', async () => {
        const mockSession = {
            token: 'valid_token',
            user: { id: 'u1', email: 'test@example.com' }
        };
        (fetch as any).mockResolvedValue({
            ok: true,
            json: async () => mockSession
        });

        const session = await AuthApi.verifyMagicLink('magic_token_123');
        expect(session.token).toBe('valid_token');
        expect(session.user.email).toBe('test@example.com');
    });

    it('should perform social login redirect', async () => {
        // Mock window.location
        const originalLocation = window.location;
        delete (window as any).location;
        window.location = { href: '' } as any;

        await AuthApi.socialLogin('google', 'tenant_123');

        expect(window.location.href).toBe('http://localhost:5000/auth/google?state=tenant_123');

        window.location.href = originalLocation.href;
    });
});
