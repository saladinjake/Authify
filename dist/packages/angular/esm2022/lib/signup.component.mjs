import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./authify.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class SignUpComponent {
    authify;
    name = '';
    email = '';
    password = '';
    loading = false;
    state$;
    constructor(authify) {
        this.authify = authify;
        this.state$ = this.authify.state$;
    }
    async handleSignup(e) {
        e.preventDefault();
        this.loading = true;
        try {
            await this.authify.signUp({
                email: this.email,
                password: this.password,
                name: this.name
            });
        }
        finally {
            this.loading = false;
        }
    }
    signInWithProvider(provider) {
        this.authify.signInWithProvider(provider);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SignUpComponent, deps: [{ token: i1.AuthifyService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: SignUpComponent, selector: "authify-signup", ngImport: i0, template: `
    <div *ngIf="state$ | async as state" class="authify-card">
      <h2 class="authify-title">Create Account</h2>
      <div *ngIf="state.error" class="authify-error">
        {{ state.error }}
      </div>
      
      <form #signupForm="ngForm" (ngSubmit)="handleSignup($event)">
        <div class="authify-input-group">
          <label class="authify-label">Full Name</label>
          <input
            type="text"
            [(ngModel)]="name"
            name="name"
            class="authify-input"
            required
            placeholder="John Doe"
          />
        </div>
        <div class="authify-input-group">
          <label class="authify-label">Email</label>
          <input
            type="email"
            [(ngModel)]="email"
            name="email"
            class="authify-input"
            required
            placeholder="you@example.com"
          />
        </div>
        <div class="authify-input-group">
          <label class="authify-label">Password</label>
          <input
            type="password"
            [(ngModel)]="password"
            name="password"
            class="authify-input"
            required
            placeholder="••••••••"
          />
        </div>
        <button 
          type="submit" 
          [disabled]="loading"
          class="authify-btn authify-btn-primary"
        >
          {{ loading ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>

      <div class="authify-divider">or</div>

      <button 
        (click)="signInWithProvider('google')"
        class="authify-btn authify-btn-secondary"
      >
        Sign up with Google
      </button>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SignUpComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'authify-signup',
                    template: `
    <div *ngIf="state$ | async as state" class="authify-card">
      <h2 class="authify-title">Create Account</h2>
      <div *ngIf="state.error" class="authify-error">
        {{ state.error }}
      </div>
      
      <form #signupForm="ngForm" (ngSubmit)="handleSignup($event)">
        <div class="authify-input-group">
          <label class="authify-label">Full Name</label>
          <input
            type="text"
            [(ngModel)]="name"
            name="name"
            class="authify-input"
            required
            placeholder="John Doe"
          />
        </div>
        <div class="authify-input-group">
          <label class="authify-label">Email</label>
          <input
            type="email"
            [(ngModel)]="email"
            name="email"
            class="authify-input"
            required
            placeholder="you@example.com"
          />
        </div>
        <div class="authify-input-group">
          <label class="authify-label">Password</label>
          <input
            type="password"
            [(ngModel)]="password"
            name="password"
            class="authify-input"
            required
            placeholder="••••••••"
          />
        </div>
        <button 
          type="submit" 
          [disabled]="loading"
          class="authify-btn authify-btn-primary"
        >
          {{ loading ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>

      <div class="authify-divider">or</div>

      <button 
        (click)="signInWithProvider('google')"
        class="authify-btn authify-btn-secondary"
      >
        Sign up with Google
      </button>
    </div>
  `
                }]
        }], ctorParameters: () => [{ type: i1.AuthifyService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXIvc3JjL2xpYi9zaWdudXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBb0UxQyxNQUFNLE9BQU8sZUFBZTtJQU9OO0lBTnBCLElBQUksR0FBVyxFQUFFLENBQUM7SUFDbEIsS0FBSyxHQUFXLEVBQUUsQ0FBQztJQUNuQixRQUFRLEdBQVcsRUFBRSxDQUFDO0lBQ3RCLE9BQU8sR0FBWSxLQUFLLENBQUM7SUFDekIsTUFBTSxDQUF3QjtJQUU5QixZQUFvQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLENBQVE7UUFDekIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQztZQUNILE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ3hCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztnQkFBUyxDQUFDO1lBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxRQUE2QjtRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7d0dBM0JVLGVBQWU7NEZBQWYsZUFBZSxzREE3RGhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJEVDs7NEZBRVUsZUFBZTtrQkEvRDNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJEVDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoaWZ5U2VydmljZSB9IGZyb20gJy4vYXV0aGlmeS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBBdXRoU3RhdGUgfSBmcm9tICdAYXV0aGlmeS9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXV0aGlmeS1zaWdudXAnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2ICpuZ0lmPVwic3RhdGUkIHwgYXN5bmMgYXMgc3RhdGVcIiBjbGFzcz1cImF1dGhpZnktY2FyZFwiPlxyXG4gICAgICA8aDIgY2xhc3M9XCJhdXRoaWZ5LXRpdGxlXCI+Q3JlYXRlIEFjY291bnQ8L2gyPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwic3RhdGUuZXJyb3JcIiBjbGFzcz1cImF1dGhpZnktZXJyb3JcIj5cclxuICAgICAgICB7eyBzdGF0ZS5lcnJvciB9fVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgXHJcbiAgICAgIDxmb3JtICNzaWdudXBGb3JtPVwibmdGb3JtXCIgKG5nU3VibWl0KT1cImhhbmRsZVNpZ251cCgkZXZlbnQpXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhpZnktaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImF1dGhpZnktbGFiZWxcIj5GdWxsIE5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJuYW1lXCJcclxuICAgICAgICAgICAgbmFtZT1cIm5hbWVcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImF1dGhpZnktaW5wdXRcIlxyXG4gICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkpvaG4gRG9lXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhpZnktaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImF1dGhpZnktbGFiZWxcIj5FbWFpbDwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJlbWFpbFwiXHJcbiAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiYXV0aGlmeS1pbnB1dFwiXHJcbiAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwieW91QGV4YW1wbGUuY29tXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhpZnktaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImF1dGhpZnktbGFiZWxcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJwYXNzd29yZFwiXHJcbiAgICAgICAgICAgIG5hbWU9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiYXV0aGlmeS1pbnB1dFwiXHJcbiAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCiXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGJ1dHRvbiBcclxuICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIiBcclxuICAgICAgICAgIFtkaXNhYmxlZF09XCJsb2FkaW5nXCJcclxuICAgICAgICAgIGNsYXNzPVwiYXV0aGlmeS1idG4gYXV0aGlmeS1idG4tcHJpbWFyeVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3sgbG9hZGluZyA/ICdDcmVhdGluZyBBY2NvdW50Li4uJyA6ICdTaWduIFVwJyB9fVxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Zvcm0+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYXV0aGlmeS1kaXZpZGVyXCI+b3I8L2Rpdj5cclxuXHJcbiAgICAgIDxidXR0b24gXHJcbiAgICAgICAgKGNsaWNrKT1cInNpZ25JbldpdGhQcm92aWRlcignZ29vZ2xlJylcIlxyXG4gICAgICAgIGNsYXNzPVwiYXV0aGlmeS1idG4gYXV0aGlmeS1idG4tc2Vjb25kYXJ5XCJcclxuICAgICAgPlxyXG4gICAgICAgIFNpZ24gdXAgd2l0aCBHb29nbGVcclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWduVXBDb21wb25lbnQge1xyXG4gIG5hbWU6IHN0cmluZyA9ICcnO1xyXG4gIGVtYWlsOiBzdHJpbmcgPSAnJztcclxuICBwYXNzd29yZDogc3RyaW5nID0gJyc7XHJcbiAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHN0YXRlJDogT2JzZXJ2YWJsZTxBdXRoU3RhdGU+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhpZnk6IEF1dGhpZnlTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnN0YXRlJCA9IHRoaXMuYXV0aGlmeS5zdGF0ZSQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyBoYW5kbGVTaWdudXAoZTogRXZlbnQpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0aGlzLmF1dGhpZnkuc2lnblVwKHtcclxuICAgICAgICBlbWFpbDogdGhpcy5lbWFpbCxcclxuICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcclxuICAgICAgICBuYW1lOiB0aGlzLm5hbWVcclxuICAgICAgfSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNpZ25JbldpdGhQcm92aWRlcihwcm92aWRlcjogJ2dvb2dsZScgfCAnZ2l0aHViJykge1xyXG4gICAgdGhpcy5hdXRoaWZ5LnNpZ25JbldpdGhQcm92aWRlcihwcm92aWRlcik7XHJcbiAgfVxyXG59XHJcbiJdfQ==