import { Component, Input } from '@angular/core';
import { AuthifyService } from './authify.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'authify-signin',
  template: `
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
  `,
  styles: [`
    /* Styles are handled by global @authify/core/styles.css but we can add local tweaks */
  `]
})
export class SignInComponent {
  email: string = '';
  loading: boolean = false;
  state$: any;

  constructor(private authify: AuthifyService) {
    this.state$ = this.authify.state$;
  }

  async handleEmailLogin(e: Event) {
    e.preventDefault();
    this.loading = true;
    try {
      await this.authify.signInWithEmail(this.email);
    } finally {
      this.loading = false;
    }
  }

  signInWithProvider(provider: 'google' | 'github') {
    this.authify.signInWithProvider(provider);
  }

  reload() {
    window.location.reload();
  }
}
