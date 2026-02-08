import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { createAuthify } from '@authify/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export const AUTHIFY_CONFIG = new InjectionToken('AUTHIFY_CONFIG');
export class AuthifyService {
    client;
    stateSubject;
    state$;
    constructor(config) {
        if (!config) {
            throw new Error('AuthifyService requires AUTHIFY_CONFIG to be provided');
        }
        this.client = createAuthify(config);
        this.stateSubject = new BehaviorSubject(this.client.state);
        this.state$ = this.stateSubject.asObservable();
        this.client.subscribe((state) => {
            this.stateSubject.next(state);
        });
    }
    get state() {
        return this.client.state;
    }
    async signInWithEmail(email) {
        return this.client.signInWithEmail(email);
    }
    async signOut() {
        return this.client.signOut();
    }
    async signIn(credentials) {
        return this.client.signIn(credentials);
    }
    async signUp(data) {
        return this.client.signUp(data);
    }
    async signInWithProvider(provider) {
        return this.client.signInWithProvider(provider);
    }
    async verifyMFA(code) {
        return this.client.verifyMFA(code);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthifyService, deps: [{ token: AUTHIFY_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthifyService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthifyService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [AUTHIFY_CONFIG]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGlmeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhci9zcmMvbGliL2F1dGhpZnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxhQUFhLEVBQXFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7O0FBRW5ELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBYSxnQkFBZ0IsQ0FBQyxDQUFDO0FBSy9FLE1BQU0sT0FBTyxjQUFjO0lBQ2YsTUFBTSxDQUFhO0lBQ25CLFlBQVksQ0FBNkI7SUFDMUMsTUFBTSxDQUF3QjtJQUVyQyxZQUFnRCxNQUFrQjtRQUM5RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQWE7UUFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBaUQ7UUFDMUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUF3RDtRQUNqRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxLQUFLLENBQUMsa0JBQWtCLENBQUMsUUFBNkI7UUFDbEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLElBQVk7UUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO3dHQTVDUSxjQUFjLGtCQUtTLGNBQWM7NEdBTHJDLGNBQWMsY0FGWCxNQUFNOzs0RkFFVCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7MEJBTWdCLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGNyZWF0ZUF1dGhpZnksIEF1dGhDbGllbnQsIEF1dGhDb25maWcsIEF1dGhTdGF0ZSB9IGZyb20gJ0BhdXRoaWZ5L2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmV4cG9ydCBjb25zdCBBVVRISUZZX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxBdXRoQ29uZmlnPignQVVUSElGWV9DT05GSUcnKTtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aGlmeVNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBjbGllbnQ6IEF1dGhDbGllbnQ7XHJcbiAgICBwcml2YXRlIHN0YXRlU3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PEF1dGhTdGF0ZT47XHJcbiAgICBwdWJsaWMgc3RhdGUkOiBPYnNlcnZhYmxlPEF1dGhTdGF0ZT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChBVVRISUZZX0NPTkZJRykgY29uZmlnOiBBdXRoQ29uZmlnKSB7XHJcbiAgICAgICAgaWYgKCFjb25maWcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoaWZ5U2VydmljZSByZXF1aXJlcyBBVVRISUZZX0NPTkZJRyB0byBiZSBwcm92aWRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsaWVudCA9IGNyZWF0ZUF1dGhpZnkoY29uZmlnKTtcclxuICAgICAgICB0aGlzLnN0YXRlU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXV0aFN0YXRlPih0aGlzLmNsaWVudC5zdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSQgPSB0aGlzLnN0YXRlU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jbGllbnQuc3Vic2NyaWJlKChzdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlU3ViamVjdC5uZXh0KHN0YXRlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3RhdGUoKTogQXV0aFN0YXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2lnbkluV2l0aEVtYWlsKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuc2lnbkluV2l0aEVtYWlsKGVtYWlsKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzaWduT3V0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5zaWduT3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2lnbkluKGNyZWRlbnRpYWxzOiB7IGVtYWlsOiBzdHJpbmc7IHBhc3N3b3JkPzogc3RyaW5nIH0pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuc2lnbkluKGNyZWRlbnRpYWxzKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzaWduVXAoZGF0YTogeyBlbWFpbDogc3RyaW5nOyBwYXNzd29yZD86IHN0cmluZzsgbmFtZTogc3RyaW5nIH0pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuc2lnblVwKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNpZ25JbldpdGhQcm92aWRlcihwcm92aWRlcjogJ2dvb2dsZScgfCAnZ2l0aHViJyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5zaWduSW5XaXRoUHJvdmlkZXIocHJvdmlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHZlcmlmeU1GQShjb2RlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQudmVyaWZ5TUZBKGNvZGUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==