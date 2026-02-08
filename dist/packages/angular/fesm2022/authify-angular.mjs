import * as i0 from '@angular/core';
import { InjectionToken, Optional, Inject, Injectable, Component, HostListener, ViewChild, NgModule } from '@angular/core';
import { createAuthify } from '@authify/core';
import { BehaviorSubject } from 'rxjs';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/forms';
import { FormsModule } from '@angular/forms';

const AUTHIFY_CONFIG = new InjectionToken('AUTHIFY_CONFIG');
class AuthifyService {
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

class SignInComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SignInComponent, deps: [{ token: AuthifyService }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: () => [{ type: AuthifyService }] });

class SignUpComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SignUpComponent, deps: [{ token: AuthifyService }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: () => [{ type: AuthifyService }] });

class UserProfileComponent {
    authify;
    state$;
    constructor(authify) {
        this.authify = authify;
        this.state$ = this.authify.state$;
    }
    signOut() {
        this.authify.signOut();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: UserProfileComponent, deps: [{ token: AuthifyService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: UserProfileComponent, selector: "authify-user-profile", ngImport: i0, template: `
    <div *ngIf="state$ | async as state" class="authify-container">
      <div *ngIf="state.status === 'authenticated' && state.user" class="authify-card" style="max-width: 400px;">
        <div class="authify-profile-info">
          <img
            [src]="state.user.avatarUrl"
            [alt]="state.user.name"
            class="authify-avatar-lg"
          />
          <div>
            <h2 class="authify-title" style="margin: 0; font-size: 20px;">{{ state.user.name }}</h2>
            <div style="color: #888; font-size: 14px;">{{ state.user.email }}</div>
          </div>
        </div>

        <div class="authify-input-group">
          <label class="authify-label">User ID</label>
          <div class="authify-monospace">
            {{ state.user.id }}
          </div>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 10px;">
          <button class="authify-btn authify-btn-secondary">
            Edit Profile
          </button>
          <button
            (click)="signOut()"
            class="authify-btn authify-btn-primary"
            style="background-color: #ef4444; color: white;"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: UserProfileComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'authify-user-profile',
                    template: `
    <div *ngIf="state$ | async as state" class="authify-container">
      <div *ngIf="state.status === 'authenticated' && state.user" class="authify-card" style="max-width: 400px;">
        <div class="authify-profile-info">
          <img
            [src]="state.user.avatarUrl"
            [alt]="state.user.name"
            class="authify-avatar-lg"
          />
          <div>
            <h2 class="authify-title" style="margin: 0; font-size: 20px;">{{ state.user.name }}</h2>
            <div style="color: #888; font-size: 14px;">{{ state.user.email }}</div>
          </div>
        </div>

        <div class="authify-input-group">
          <label class="authify-label">User ID</label>
          <div class="authify-monospace">
            {{ state.user.id }}
          </div>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 10px;">
          <button class="authify-btn authify-btn-secondary">
            Edit Profile
          </button>
          <button
            (click)="signOut()"
            class="authify-btn authify-btn-primary"
            style="background-color: #ef4444; color: white;"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  `
                }]
        }], ctorParameters: () => [{ type: AuthifyService }] });

class UserButtonComponent {
    authify;
    state$;
    isOpen = false;
    menuContainer;
    constructor(authify) {
        this.authify = authify;
        this.state$ = this.authify.state$;
    }
    toggleMenu(event) {
        event.stopPropagation();
        this.isOpen = !this.isOpen;
    }
    signOut() {
        this.authify.signOut();
        this.isOpen = false;
    }
    onDocumentClick(event) {
        if (this.isOpen && !this.menuContainer.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: UserButtonComponent, deps: [{ token: AuthifyService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: UserButtonComponent, selector: "authify-user-button", host: { listeners: { "document:click": "onDocumentClick($event)" } }, viewQueries: [{ propertyName: "menuContainer", first: true, predicate: ["menuContainer"], descendants: true }], ngImport: i0, template: `
    <div *ngIf="state$ | async as state" style="position: relative; display: inline-block;" #menuContainer>
      <div *ngIf="state.status === 'authenticated' && state.user">
        <button (click)="toggleMenu($event)" class="authify-user-button-trigger">
          <img
            [src]="state.user.avatarUrl || 'https://ui-avatars.com/api/?name=' + (state.user.name || 'User')"
            alt="Profile"
            class="authify-avatar"
          />
        </button>

        <div *ngIf="isOpen" class="authify-dropdown">
          <div class="authify-dropdown-header">
            <div class="authify-dropdown-name">{{ state.user.name || 'User' }}</div>
            <div class="authify-dropdown-email">{{ state.user.email }}</div>
          </div>
          
          <button class="authify-dropdown-item">Manage Account</button>
          
          <button 
            (click)="signOut()" 
            class="authify-dropdown-item authify-dropdown-item-danger"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: UserButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'authify-user-button',
                    template: `
    <div *ngIf="state$ | async as state" style="position: relative; display: inline-block;" #menuContainer>
      <div *ngIf="state.status === 'authenticated' && state.user">
        <button (click)="toggleMenu($event)" class="authify-user-button-trigger">
          <img
            [src]="state.user.avatarUrl || 'https://ui-avatars.com/api/?name=' + (state.user.name || 'User')"
            alt="Profile"
            class="authify-avatar"
          />
        </button>

        <div *ngIf="isOpen" class="authify-dropdown">
          <div class="authify-dropdown-header">
            <div class="authify-dropdown-name">{{ state.user.name || 'User' }}</div>
            <div class="authify-dropdown-email">{{ state.user.email }}</div>
          </div>
          
          <button class="authify-dropdown-item">Manage Account</button>
          
          <button 
            (click)="signOut()" 
            class="authify-dropdown-item authify-dropdown-item-danger"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  `
                }]
        }], ctorParameters: () => [{ type: AuthifyService }], propDecorators: { menuContainer: [{
                type: ViewChild,
                args: ['menuContainer']
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

class AuthifyModule {
    static forRoot(config) {
        return {
            ngModule: AuthifyModule,
            providers: [
                { provide: AUTHIFY_CONFIG, useValue: config },
                AuthifyService
            ]
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthifyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.12", ngImport: i0, type: AuthifyModule, declarations: [SignInComponent,
            SignUpComponent,
            UserProfileComponent,
            UserButtonComponent], imports: [CommonModule,
            FormsModule], exports: [SignInComponent,
            SignUpComponent,
            UserProfileComponent,
            UserButtonComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthifyModule, imports: [CommonModule,
            FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthifyModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SignInComponent,
                        SignUpComponent,
                        UserProfileComponent,
                        UserButtonComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    exports: [
                        SignInComponent,
                        SignUpComponent,
                        UserProfileComponent,
                        UserButtonComponent
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AUTHIFY_CONFIG, AuthifyModule, AuthifyService, SignInComponent, SignUpComponent, UserButtonComponent, UserProfileComponent };
//# sourceMappingURL=authify-angular.mjs.map
