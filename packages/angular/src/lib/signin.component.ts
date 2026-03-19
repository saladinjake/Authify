import { Component } from '@angular/core';
import { AuthifyService } from './authify.service';
import { Observable } from 'rxjs';
import { AuthState } from '@authify/core';

@Component({
  selector: 'authify-signin',
  template: `
    <div *ngIf="state$ | async as state">
      <authify-forgot-password 
        *ngIf="view === 'forgot'" 
        (back)="view = 'signin'" 
        (sent)="handleSent($event)"
      ></authify-forgot-password>

      <authify-reset-password 
        *ngIf="view === 'reset'" 
        [email]="resetEmail" 
        (back)="view = 'signin'" 
        (success)="view = 'signin'"
      ></authify-reset-password>

      <ng-container *ngIf="view === 'signin'">
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
            
            <form #authForm="ngForm" (ngSubmit)="handleLogin($event)">
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
                <div style="display: flex; justify-content: space-between">
                  <label class="authify-label">Password</label>
                  <button 
                    type="button" 
                    (click)="view = 'forgot'"
                    style="background: none; border: none; padding: 0; color: var(--authify-primary-color); font-size: 12px; cursor: pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  [(ngModel)]="password"
                  name="password"
                  class="authify-input"
                  placeholder="••••••••"
                />
              </div>
              <button 
                type="submit" 
                [disabled]="loading"
                class="authify-btn authify-btn-primary"
              >
                {{ loading ? 'Signing in...' : (password ? 'Sign In' : 'Continue with Email') }}
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
      </ng-container>
    </div>
  `,
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  view: 'signin' | 'forgot' | 'reset' = 'signin';
  resetEmail: string = '';
  state$: Observable<AuthState>;

  constructor(private authify: AuthifyService) {
    this.state$ = this.authify.state$;
  }

  async handleLogin(e: Event) {
    e.preventDefault();
    this.loading = true;
    try {
      await this.authify.signIn({ email: this.email, password: this.password });
    } finally {
      this.loading = false;
    }
  }

  handleSent(mail: string) {
    this.resetEmail = mail;
    this.view = 'reset';
  }

  signInWithProvider(provider: 'google' | 'github') {
    this.authify.signInWithProvider(provider);
  }

  reload() {
    window.location.reload();
  }
}
