import { AuthifyService } from './authify.service';
import { Observable } from 'rxjs';
import { AuthState } from '@authify/core';
import * as i0 from "@angular/core";
export declare class SignUpComponent {
    private authify;
    name: string;
    email: string;
    password: string;
    loading: boolean;
    state$: Observable<AuthState>;
    constructor(authify: AuthifyService);
    handleSignup(e: Event): Promise<void>;
    signInWithProvider(provider: 'google' | 'github'): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SignUpComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SignUpComponent, "authify-signup", never, {}, {}, never, never, false, never>;
}
