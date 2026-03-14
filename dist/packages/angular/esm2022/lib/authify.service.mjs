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
    async verifyMagicLink(token) {
        return this.client.verifyMagicLink(token);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGlmeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhci9zcmMvbGliL2F1dGhpZnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxhQUFhLEVBQXFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7O0FBRW5ELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBYSxnQkFBZ0IsQ0FBQyxDQUFDO0FBSy9FLE1BQU0sT0FBTyxjQUFjO0lBQ2YsTUFBTSxDQUFhO0lBQ25CLFlBQVksQ0FBNkI7SUFDMUMsTUFBTSxDQUF3QjtJQUVyQyxZQUFnRCxNQUFrQjtRQUM5RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQWE7UUFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBaUQ7UUFDMUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFhO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBd0Q7UUFDakUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFFBQTZCO1FBQ2xELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFZO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQzt3R0FoRFEsY0FBYyxrQkFLUyxjQUFjOzRHQUxyQyxjQUFjLGNBRlgsTUFBTTs7NEZBRVQsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7OzBCQU1nQixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBjcmVhdGVBdXRoaWZ5LCBBdXRoQ2xpZW50LCBBdXRoQ29uZmlnLCBBdXRoU3RhdGUgfSBmcm9tICdAYXV0aGlmeS9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgY29uc3QgQVVUSElGWV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48QXV0aENvbmZpZz4oJ0FVVEhJRllfQ09ORklHJyk7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dGhpZnlTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgY2xpZW50OiBBdXRoQ2xpZW50O1xyXG4gICAgcHJpdmF0ZSBzdGF0ZVN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxBdXRoU3RhdGU+O1xyXG4gICAgcHVibGljIHN0YXRlJDogT2JzZXJ2YWJsZTxBdXRoU3RhdGU+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoQVVUSElGWV9DT05GSUcpIGNvbmZpZzogQXV0aENvbmZpZykge1xyXG4gICAgICAgIGlmICghY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGlmeVNlcnZpY2UgcmVxdWlyZXMgQVVUSElGWV9DT05GSUcgdG8gYmUgcHJvdmlkZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGllbnQgPSBjcmVhdGVBdXRoaWZ5KGNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZVN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEF1dGhTdGF0ZT4odGhpcy5jbGllbnQuc3RhdGUpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUkID0gdGhpcy5zdGF0ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xpZW50LnN1YnNjcmliZSgoc3RhdGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVN1YmplY3QubmV4dChzdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHN0YXRlKCk6IEF1dGhTdGF0ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNpZ25JbldpdGhFbWFpbChlbWFpbDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnNpZ25JbldpdGhFbWFpbChlbWFpbCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2lnbk91dCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuc2lnbk91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNpZ25JbihjcmVkZW50aWFsczogeyBlbWFpbDogc3RyaW5nOyBwYXNzd29yZD86IHN0cmluZyB9KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnNpZ25JbihjcmVkZW50aWFscyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgdmVyaWZ5TWFnaWNMaW5rKHRva2VuOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQudmVyaWZ5TWFnaWNMaW5rKHRva2VuKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzaWduVXAoZGF0YTogeyBlbWFpbDogc3RyaW5nOyBwYXNzd29yZD86IHN0cmluZzsgbmFtZTogc3RyaW5nIH0pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuc2lnblVwKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNpZ25JbldpdGhQcm92aWRlcihwcm92aWRlcjogJ2dvb2dsZScgfCAnZ2l0aHViJyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5zaWduSW5XaXRoUHJvdmlkZXIocHJvdmlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHZlcmlmeU1GQShjb2RlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQudmVyaWZ5TUZBKGNvZGUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==