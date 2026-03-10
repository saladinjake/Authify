import { App, Plugin, reactive, readonly, inject } from 'vue';
import { createAuthify, AuthClient, AuthConfig, AuthState } from '@authify/core';

export const AuthClientKey = Symbol('AuthClient');
export const AuthStateKey = Symbol('AuthState');

export const AuthifyPlugin: Plugin = {
    install(app: App, options: { config: AuthConfig } | { client: AuthClient }) {
        let client: AuthClient;

        if ('client' in options) {
            client = options.client;
        } else {
            client = createAuthify(options.config);
        }

        // specific to Vue: make state reactive
        const state = reactive<AuthState>(client.state);

        client.subscribe((newState) => {
            Object.assign(state, newState);
        });

        app.provide(AuthClientKey, client);
        app.provide(AuthStateKey, readonly(state));
    }
};

export function useAuthClient(): AuthClient {
    const client = inject<AuthClient>(AuthClientKey);
    if (!client) throw new Error('AuthifyPlugin not installed');
    return client;
}

export function useAuthState(): AuthState {
    const state = inject<AuthState>(AuthStateKey);
    if (!state) throw new Error('AuthifyPlugin not installed');
    return state;
}
