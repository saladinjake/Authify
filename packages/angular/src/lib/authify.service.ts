import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { createAuthify, AuthClient, AuthConfig, AuthState } from '@authify/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const AUTHIFY_CONFIG = new InjectionToken<AuthConfig>('AUTHIFY_CONFIG');

@Injectable({
    providedIn: 'root'
})
export class AuthifyService {
    private client: AuthClient;
    private stateSubject: BehaviorSubject<AuthState>;
    public state$: Observable<AuthState>;

    constructor(@Optional() @Inject(AUTHIFY_CONFIG) config: AuthConfig) {
        if (!config) {
            throw new Error('AuthifyService requires AUTHIFY_CONFIG to be provided');
        }
        this.client = createAuthify(config);
        this.stateSubject = new BehaviorSubject<AuthState>(this.client.state);
        this.state$ = this.stateSubject.asObservable();

        this.client.subscribe((state) => {
            this.stateSubject.next(state);
        });
    }

    get state(): AuthState {
        return this.client.state;
    }

    async signInWithEmail(email: string): Promise<void> {
        return this.client.signInWithEmail(email);
    }

    async signOut(): Promise<void> {
        return this.client.signOut();
    }

    async signInWithProvider(provider: 'google' | 'github'): Promise<void> {
        return this.client.signInWithProvider(provider);
    }
}
