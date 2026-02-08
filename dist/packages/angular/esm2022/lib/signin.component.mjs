import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./authify.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class SignInComponent {
    authify;
    email = '';
    loading = false;
    state$;
    constructor(authify) {
        this.authify = authify;
        this.state$ = this.authify.state$;
    }
    async handleEmailLogin(e) {
        e.preventDefault();
        this.loading = true;
        try {
            await this.authify.signInWithEmail(this.email);
        }
        finally {
            this.loading = false;
        }
    }
    signInWithProvider(provider) {
        this.authify.signInWithProvider(provider);
    }
    reload() {
        window.location.reload();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SignInComponent, deps: [{ token: i1.AuthifyService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: SignInComponent, selector: "authify-signin", ngImport: i0, template: `
    <div *ngIf="state$ | async as state">
      <div *ngIf="state.status === 'awaiting_verification'; else signInForm" class="authify-card" style="text-align: center;">
        <div style="font-size: 48px; margin-bottom: 16px;">✉️</div>
        <h2 class="authify-title">Check your email</h2>
        <p style="color: #666; margin-bottom: 24px; line-height: 1.5;">
          We've sent a magic link to <strong>{{ email }}</strong>.<br />
          Click the link in the email to sign in.
        </p>
        <div class="authify-divider"></div>
        <button 
          (click)="reload()" 
          class="authify-btn authify-btn-secondary"
        >
          Back to Sign In
        </button>
      </div>

      <ng-template #signInForm>
        <div class="authify-card">
          <h2 class="authify-title">Sign In</h2>
          <div *ngIf="state.error" class="authify-error">
            {{ state.error }}
          </div>
          
          <form #authForm="ngForm" (ngSubmit)="handleEmailLogin($event)">
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
            <button 
              type="submit" 
              [disabled]="loading"
              class="authify-btn authify-btn-primary"
            >
              {{ loading ? 'Sending Magic Link...' : 'Continue with Email' }}
            </button>
          </form>

          <div class="authify-divider">or</div>

          <div class="authify-social-stack">
            <button 
              (click)="signInWithProvider('google')"
              class="authify-btn authify-btn-secondary"
            >
              Sign in with Google
            </button>
            <button 
               (click)="signInWithProvider('github')"
               class="authify-btn authify-btn-primary" 
               style="background: #333; border: 1px solid #333;"
            >
              Sign in with GitHub
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `, isInline: true, styles: [""], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SignInComponent, decorators: [{
            type: Component,
            args: [{ selector: 'authify-signin', template: `
    <div *ngIf="state$ | async as state">
      <div *ngIf="state.status === 'awaiting_verification'; else signInForm" class="authify-card" style="text-align: center;">
        <div style="font-size: 48px; margin-bottom: 16px;">✉️</div>
        <h2 class="authify-title">Check your email</h2>
        <p style="color: #666; margin-bottom: 24px; line-height: 1.5;">
          We've sent a magic link to <strong>{{ email }}</strong>.<br />
          Click the link in the email to sign in.
        </p>
        <div class="authify-divider"></div>
        <button 
          (click)="reload()" 
          class="authify-btn authify-btn-secondary"
        >
          Back to Sign In
        </button>
      </div>

      <ng-template #signInForm>
        <div class="authify-card">
          <h2 class="authify-title">Sign In</h2>
          <div *ngIf="state.error" class="authify-error">
            {{ state.error }}
          </div>
          
          <form #authForm="ngForm" (ngSubmit)="handleEmailLogin($event)">
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
            <button 
              type="submit" 
              [disabled]="loading"
              class="authify-btn authify-btn-primary"
            >
              {{ loading ? 'Sending Magic Link...' : 'Continue with Email' }}
            </button>
          </form>

          <div class="authify-divider">or</div>

          <div class="authify-social-stack">
            <button 
              (click)="signInWithProvider('google')"
              class="authify-btn authify-btn-secondary"
            >
              Sign in with Google
            </button>
            <button 
               (click)="signInWithProvider('github')"
               class="authify-btn authify-btn-primary" 
               style="background: #333; border: 1px solid #333;"
            >
              Sign in with GitHub
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  ` }]
        }], ctorParameters: () => [{ type: i1.AuthifyService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXIvc3JjL2xpYi9zaWduaW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBOEVqRCxNQUFNLE9BQU8sZUFBZTtJQUtOO0lBSnBCLEtBQUssR0FBVyxFQUFFLENBQUM7SUFDbkIsT0FBTyxHQUFZLEtBQUssQ0FBQztJQUN6QixNQUFNLENBQXdCO0lBRTlCLFlBQW9CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFRO1FBQzdCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUM7WUFDSCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxDQUFDO2dCQUFTLENBQUM7WUFDVCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztJQUVELGtCQUFrQixDQUFDLFFBQTZCO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzNCLENBQUM7d0dBekJVLGVBQWU7NEZBQWYsZUFBZSxzREF2RWhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrRVQ7OzRGQUtVLGVBQWU7a0JBekUzQixTQUFTOytCQUNFLGdCQUFnQixZQUNoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0VUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoaWZ5U2VydmljZSB9IGZyb20gJy4vYXV0aGlmeS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBBdXRoU3RhdGUgfSBmcm9tICdAYXV0aGlmeS9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXV0aGlmeS1zaWduaW4nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2ICpuZ0lmPVwic3RhdGUkIHwgYXN5bmMgYXMgc3RhdGVcIj5cclxuICAgICAgPGRpdiAqbmdJZj1cInN0YXRlLnN0YXR1cyA9PT0gJ2F3YWl0aW5nX3ZlcmlmaWNhdGlvbic7IGVsc2Ugc2lnbkluRm9ybVwiIGNsYXNzPVwiYXV0aGlmeS1jYXJkXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogNDhweDsgbWFyZ2luLWJvdHRvbTogMTZweDtcIj7inInvuI88L2Rpdj5cclxuICAgICAgICA8aDIgY2xhc3M9XCJhdXRoaWZ5LXRpdGxlXCI+Q2hlY2sgeW91ciBlbWFpbDwvaDI+XHJcbiAgICAgICAgPHAgc3R5bGU9XCJjb2xvcjogIzY2NjsgbWFyZ2luLWJvdHRvbTogMjRweDsgbGluZS1oZWlnaHQ6IDEuNTtcIj5cclxuICAgICAgICAgIFdlJ3ZlIHNlbnQgYSBtYWdpYyBsaW5rIHRvIDxzdHJvbmc+e3sgZW1haWwgfX08L3N0cm9uZz4uPGJyIC8+XHJcbiAgICAgICAgICBDbGljayB0aGUgbGluayBpbiB0aGUgZW1haWwgdG8gc2lnbiBpbi5cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhpZnktZGl2aWRlclwiPjwvZGl2PlxyXG4gICAgICAgIDxidXR0b24gXHJcbiAgICAgICAgICAoY2xpY2spPVwicmVsb2FkKClcIiBcclxuICAgICAgICAgIGNsYXNzPVwiYXV0aGlmeS1idG4gYXV0aGlmeS1idG4tc2Vjb25kYXJ5XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICBCYWNrIHRvIFNpZ24gSW5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8bmctdGVtcGxhdGUgI3NpZ25JbkZvcm0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhpZnktY2FyZFwiPlxyXG4gICAgICAgICAgPGgyIGNsYXNzPVwiYXV0aGlmeS10aXRsZVwiPlNpZ24gSW48L2gyPlxyXG4gICAgICAgICAgPGRpdiAqbmdJZj1cInN0YXRlLmVycm9yXCIgY2xhc3M9XCJhdXRoaWZ5LWVycm9yXCI+XHJcbiAgICAgICAgICAgIHt7IHN0YXRlLmVycm9yIH19XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgPGZvcm0gI2F1dGhGb3JtPVwibmdGb3JtXCIgKG5nU3VibWl0KT1cImhhbmRsZUVtYWlsTG9naW4oJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aGlmeS1pbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImF1dGhpZnktbGFiZWxcIj5FbWFpbDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxyXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJlbWFpbFwiXHJcbiAgICAgICAgICAgICAgICBuYW1lPVwiZW1haWxcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJhdXRoaWZ5LWlucHV0XCJcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInlvdUBleGFtcGxlLmNvbVwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxidXR0b24gXHJcbiAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiIFxyXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJsb2FkaW5nXCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImF1dGhpZnktYnRuIGF1dGhpZnktYnRuLXByaW1hcnlcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3sgbG9hZGluZyA/ICdTZW5kaW5nIE1hZ2ljIExpbmsuLi4nIDogJ0NvbnRpbnVlIHdpdGggRW1haWwnIH19XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9mb3JtPlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdXRoaWZ5LWRpdmlkZXJcIj5vcjwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdXRoaWZ5LXNvY2lhbC1zdGFja1wiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgICAgIChjbGljayk9XCJzaWduSW5XaXRoUHJvdmlkZXIoJ2dvb2dsZScpXCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImF1dGhpZnktYnRuIGF1dGhpZnktYnRuLXNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICBTaWduIGluIHdpdGggR29vZ2xlXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgICAgICAoY2xpY2spPVwic2lnbkluV2l0aFByb3ZpZGVyKCdnaXRodWInKVwiXHJcbiAgICAgICAgICAgICAgIGNsYXNzPVwiYXV0aGlmeS1idG4gYXV0aGlmeS1idG4tcHJpbWFyeVwiIFxyXG4gICAgICAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQ6ICMzMzM7IGJvcmRlcjogMXB4IHNvbGlkICMzMzM7XCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIFNpZ24gaW4gd2l0aCBHaXRIdWJcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLyogU3R5bGVzIGFyZSBoYW5kbGVkIGJ5IGdsb2JhbCBAYXV0aGlmeS9jb3JlL3N0eWxlcy5jc3MgYnV0IHdlIGNhbiBhZGQgbG9jYWwgdHdlYWtzICovXHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpZ25JbkNvbXBvbmVudCB7XHJcbiAgZW1haWw6IHN0cmluZyA9ICcnO1xyXG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzdGF0ZSQ6IE9ic2VydmFibGU8QXV0aFN0YXRlPjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoaWZ5OiBBdXRoaWZ5U2VydmljZSkge1xyXG4gICAgdGhpcy5zdGF0ZSQgPSB0aGlzLmF1dGhpZnkuc3RhdGUkO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaGFuZGxlRW1haWxMb2dpbihlOiBFdmVudCkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuYXV0aGlmeS5zaWduSW5XaXRoRW1haWwodGhpcy5lbWFpbCk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNpZ25JbldpdGhQcm92aWRlcihwcm92aWRlcjogJ2dvb2dsZScgfCAnZ2l0aHViJykge1xyXG4gICAgdGhpcy5hdXRoaWZ5LnNpZ25JbldpdGhQcm92aWRlcihwcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICByZWxvYWQoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==