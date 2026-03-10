import { Injectable } from '@angular/core';
import { AuthifyService } from './authify.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GoogleAuthService {
    private tokenSubject = new BehaviorSubject<string | null>(null);
    public token$ = this.tokenSubject.asObservable();

    constructor(private authify: AuthifyService) {
        this.checkCallback();
    }

    private async checkCallback() {
        if (typeof window === 'undefined') return;

        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');

        if (urlToken) {
            this.tokenSubject.next(urlToken);
            // Verify magic link acts as a way to convert the token to a session via backend mapping
            try {
                await this.authify.verifyMagicLink(urlToken);
            } catch (err) {
                console.error(err);
            }
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    async login(): Promise<void> {
        return this.authify.signInWithProvider('google');
    }

    async signup(): Promise<void> {
        // Social signup is the same as login
        return this.authify.signInWithProvider('google');
    }

    getToken(): string | null {
        return this.tokenSubject.value;
    }
}
