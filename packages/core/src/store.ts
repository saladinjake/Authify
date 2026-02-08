import { AuthState, AuthStatus, User, AuthSession, MFAChallenge } from './types';
import { AuthApi } from './api';

type Listener = (state: AuthState) => void;

export class AuthStore {
    private state: AuthState = {
        status: 'loading',
        user: null,
        session: null,
        error: null,
        mfaChallenge: null,
    };

    private apiKey: string | null = null;
    private listeners: Set<Listener> = new Set();

    constructor(apiKey?: string) {
        if (apiKey) this.apiKey = apiKey;

    }



    getState(): AuthState {
        return this.state;
    }

    subscribe(listener: Listener): () => void {
        this.listeners.add(listener);
        listener(this.state);
        return () => this.listeners.delete(listener);
    }






}

export const createStore = (apiKey?: string) => new AuthStore(apiKey);
