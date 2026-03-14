import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./authify.service";
export class GoogleAuthService {
    authify;
    tokenSubject = new BehaviorSubject(null);
    token$ = this.tokenSubject.asObservable();
    constructor(authify) {
        this.authify = authify;
        this.checkCallback();
    }
    async checkCallback() {
        if (typeof window === 'undefined')
            return;
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        if (urlToken) {
            this.tokenSubject.next(urlToken);
            // Verify magic link acts as a way to convert the token to a session via backend mapping
            try {
                await this.authify.verifyMagicLink(urlToken);
            }
            catch (err) {
                console.error(err);
            }
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
    async login() {
        return this.authify.signInWithProvider('google');
    }
    async signup() {
        // Social signup is the same as login
        return this.authify.signInWithProvider('google');
    }
    getToken() {
        return this.tokenSubject.value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: GoogleAuthService, deps: [{ token: i1.AuthifyService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: GoogleAuthService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: GoogleAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.AuthifyService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWF1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXIvc3JjL2xpYi9nb29nbGUtYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBS3ZDLE1BQU0sT0FBTyxpQkFBaUI7SUFJTjtJQUhaLFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7SUFDekQsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFakQsWUFBb0IsT0FBdUI7UUFBdkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxLQUFLLENBQUMsYUFBYTtRQUN2QixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVc7WUFBRSxPQUFPO1FBRTFDLE1BQU0sU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4QyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsd0ZBQXdGO1lBQ3hGLElBQUksQ0FBQztnQkFDRCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELENBQUM7WUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUUsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU07UUFDUixxQ0FBcUM7UUFDckMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUNuQyxDQUFDO3dHQXJDUSxpQkFBaUI7NEdBQWpCLGlCQUFpQixjQUZkLE1BQU07OzRGQUVULGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoaWZ5U2VydmljZSB9IGZyb20gJy4vYXV0aGlmeS5zZXJ2aWNlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdvb2dsZUF1dGhTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHRva2VuU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gICAgcHVibGljIHRva2VuJCA9IHRoaXMudG9rZW5TdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoaWZ5OiBBdXRoaWZ5U2VydmljZSkge1xuICAgICAgICB0aGlzLmNoZWNrQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGNoZWNrQ2FsbGJhY2soKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgIGNvbnN0IHVybFRva2VuID0gdXJsUGFyYW1zLmdldCgndG9rZW4nKTtcblxuICAgICAgICBpZiAodXJsVG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMudG9rZW5TdWJqZWN0Lm5leHQodXJsVG9rZW4pO1xuICAgICAgICAgICAgLy8gVmVyaWZ5IG1hZ2ljIGxpbmsgYWN0cyBhcyBhIHdheSB0byBjb252ZXJ0IHRoZSB0b2tlbiB0byBhIHNlc3Npb24gdmlhIGJhY2tlbmQgbWFwcGluZ1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmF1dGhpZnkudmVyaWZ5TWFnaWNMaW5rKHVybFRva2VuKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBsb2dpbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aGlmeS5zaWduSW5XaXRoUHJvdmlkZXIoJ2dvb2dsZScpO1xuICAgIH1cblxuICAgIGFzeW5jIHNpZ251cCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gU29jaWFsIHNpZ251cCBpcyB0aGUgc2FtZSBhcyBsb2dpblxuICAgICAgICByZXR1cm4gdGhpcy5hdXRoaWZ5LnNpZ25JbldpdGhQcm92aWRlcignZ29vZ2xlJyk7XG4gICAgfVxuXG4gICAgZ2V0VG9rZW4oKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuU3ViamVjdC52YWx1ZTtcbiAgICB9XG59XG4iXX0=