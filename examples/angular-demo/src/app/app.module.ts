import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthifyModule } from '@authify/angular';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AuthifyModule.forRoot({
            clientId: 'dev_tenant_1',
            apiKey: 'dev_api_key_123',
            domain: 'localhost:5000',
            googleClientId: 'dummy_client_id',
            googleClientSecret: 'dummy_secret',
            googleCallbackUrl: 'http://localhost:4200/auth/callback',
            theme: {
                primaryColor: '#6366f1', // Indigo
                borderRadius: '12px'
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
