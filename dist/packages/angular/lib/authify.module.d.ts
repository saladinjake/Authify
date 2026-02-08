import { ModuleWithProviders } from '@angular/core';
import { AuthConfig } from '@authify/core';
import * as i0 from "@angular/core";
import * as i1 from "./signin.component";
import * as i2 from "./signup.component";
import * as i3 from "./user-profile.component";
import * as i4 from "./user-button.component";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
export declare class AuthifyModule {
    static forRoot(config: AuthConfig): ModuleWithProviders<AuthifyModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthifyModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AuthifyModule, [typeof i1.SignInComponent, typeof i2.SignUpComponent, typeof i3.UserProfileComponent, typeof i4.UserButtonComponent], [typeof i5.CommonModule, typeof i6.FormsModule], [typeof i1.SignInComponent, typeof i2.SignUpComponent, typeof i3.UserProfileComponent, typeof i4.UserButtonComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AuthifyModule>;
}
