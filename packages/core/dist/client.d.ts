import { AuthConfig } from './types';
import { AuthStore } from './store';
export declare class AuthClient {
    private store;
    private config;
    constructor(config: AuthConfig);
    private applyTheme;
    subscribe(cb: (state: ReturnType<AuthStore['getState']>) => void): () => void;
    get state(): import("./types").AuthState;
    signInWithEmail(email: string): Promise<void>;
    verifyMagicLink(token: string): Promise<void>;
    signOut(): Promise<void>;
    signInWithProvider(provider: 'google' | 'github'): Promise<void>;
    signIn(credentials: {
        email: string;
        password?: string;
    }): Promise<void>;
    signUp(data: {
        email: string;
        password?: string;
        name: string;
    }): Promise<void>;
    verifyMFA(code: string): Promise<void>;
}
export declare function createAuthify(config: AuthConfig): AuthClient;
