import { AuthifyService } from './authify.service';
import { Observable } from 'rxjs';
import { AuthState } from '@authify/core';
import * as i0 from "@angular/core";
export declare class UserProfileComponent {
    private authify;
    state$: Observable<AuthState>;
    constructor(authify: AuthifyService);
    signOut(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserProfileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserProfileComponent, "authify-user-profile", never, {}, {}, never, never, false, never>;
}
