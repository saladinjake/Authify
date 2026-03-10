import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useAuth } from '../src/composables';
import { AuthifyPlugin, AuthClientKey, AuthStateKey } from '../src/plugin';
import { defineComponent, h } from 'vue';

const MockComponent = defineComponent({
    setup() {
        const auth = useAuth();
        return { auth };
    },
    render() {
        return h('div', this.auth.isSignedIn.value ? 'signed-in' : 'signed-out');
    }
});

describe('Vue composables', () => {
    it('should provide auth state', () => {
        const clientMock = {
            state: { status: 'unauthenticated', user: null, session: null, error: null },
            subscribe: vi.fn(() => vi.fn())
        };

        const wrapper = mount(MockComponent, {
            global: {
                provide: {
                    [AuthClientKey]: clientMock,
                    [AuthStateKey]: clientMock.state
                }
            }
        });

        expect(wrapper.text()).toBe('signed-out');
    });
});
