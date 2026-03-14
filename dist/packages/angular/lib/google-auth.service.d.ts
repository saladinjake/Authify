import { AuthifyService } from './authify.service';
import * as i0 from "@angular/core";
export declare class GoogleAuthService {
    private authify;
    private tokenSubject;
    token$: import("rxjs").Observable<string>;
    constructor(authify: AuthifyService);
    private checkCallback;
    login(): Promise<void>;
    signup(): Promise<void>;
    getToken(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<GoogleAuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GoogleAuthService>;
}
