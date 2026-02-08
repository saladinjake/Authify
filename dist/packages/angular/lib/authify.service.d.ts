import { InjectionToken } from '@angular/core';
import { AuthConfig, AuthState } from '@authify/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare const AUTHIFY_CONFIG: InjectionToken<AuthConfig>;
export declare class AuthifyService {
    private client;
    private stateSubject;
    state$: Observable<AuthState>;
    constructor(config: AuthConfig);
    get state(): AuthState;
    signInWithEmail(email: string): Promise<void>;
    signOut(): Promise<void>;
    signIn(credentials: {
        email: string;
        password?: string;
    }): Promise<void>;
    signUp(data: {
        email: string;
        password?: string;
        name: string;
    }): Promise<void>;
    signInWithProvider(provider: 'google' | 'github'): Promise<void>;
    verifyMFA(code: string): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthifyService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthifyService>;
}
