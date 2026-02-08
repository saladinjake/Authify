import { AuthState, AuthSession, MFAChallenge } from './types';
type Listener = (state: AuthState) => void;
export declare class AuthStore {
    private state;
    private apiKey;
    private listeners;
    constructor(apiKey?: string);
    setMFAChallenge(challenge: MFAChallenge): void;
    getState(): AuthState;
    subscribe(listener: Listener): () => void;
    private setState;
    private notify;
    private hydrate;
    setSession(session: AuthSession): void;
    clearSession(): void;
    setAwaitingVerification(): void;
    setError(error: string | null): void;
}
export declare const createStore: (apiKey?: string) => AuthStore;
export {};
