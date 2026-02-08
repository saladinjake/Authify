import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthifyService } from '../src/lib/authify.service';
import { AuthConfig } from '@authify/core';

describe('AuthifyService (Angular)', () => {
    let service: AuthifyService;
    const mockConfig: AuthConfig = { clientId: 'test', domain: 'test' };

    beforeEach(() => {
        service = new AuthifyService(mockConfig);
    });

    it('should initialize and have loading status', () => {
        expect(service.state.status).toBe('loading');
    });

    it('should call signInWithProvider on client', async () => {
        const spy = vi.spyOn(service as any, 'client', 'get').mockReturnValue({
            signInWithProvider: vi.fn(),
            subscribe: vi.fn(() => vi.fn())
        });

    });
});
