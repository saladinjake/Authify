import { ElementRef } from '@angular/core';
import { AuthifyService } from './authify.service';
import { Observable } from 'rxjs';
import { AuthState } from '@authify/core';
import * as i0 from "@angular/core";
export declare class UserButtonComponent {
    private authify;
    state$: Observable<AuthState>;
    isOpen: boolean;
    menuContainer: ElementRef;
    constructor(authify: AuthifyService);
    toggleMenu(event: Event): void;
    signOut(): void;
    onDocumentClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserButtonComponent, "authify-user-button", never, {}, {}, never, never, false, never>;
}
