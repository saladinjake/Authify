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


});
