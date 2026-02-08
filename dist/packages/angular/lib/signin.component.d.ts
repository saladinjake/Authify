import { AuthifyService } from './authify.service';
import { Observable } from 'rxjs';
import { AuthState } from '@authify/core';
import * as i0 from "@angular/core";
export declare class SignInComponent {
    private authify;
    email: string;
    loading: boolean;
    state$: Observable<AuthState>;
    constructor(authify: AuthifyService);
    handleEmailLogin(e: Event): Promise<void>;
    signInWithProvider(provider: 'google' | 'github'): void;
    reload(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SignInComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SignInComponent, "authify-signin", never, {}, {}, never, never, false, never>;
}
