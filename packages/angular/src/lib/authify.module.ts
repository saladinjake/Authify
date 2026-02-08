import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './signin.component';
import { UserProfileComponent } from './user-profile.component';
import { UserButtonComponent } from './user-button.component';
import { AuthifyService, AUTHIFY_CONFIG } from './authify.service';
import { AuthConfig } from '@authify/core';

@NgModule({
    declarations: [
        SignInComponent,
        UserProfileComponent,
        UserButtonComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        SignInComponent,
        UserProfileComponent,
        UserButtonComponent
    ]
})
export class AuthifyModule {
    static forRoot(config: AuthConfig): ModuleWithProviders<AuthifyModule> {
        return {
            ngModule: AuthifyModule,
            providers: [
                { provide: AUTHIFY_CONFIG, useValue: config },
                AuthifyService
            ]
        };
    }
}
