import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { AuthifyModule } from '@authify/angular';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AuthifyModule.forRoot({
            clientId: 'dev_tenant_1',
            apiKey: 'dev_api_key_123',
            domain: 'localhost:5000',
            googleClientId: '', // Add your client ID to .env
            googleClientSecret: '', // Add your client secret to .env
            googleCallbackUrl: 'http://localhost:5000/auth/google/callback',
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
