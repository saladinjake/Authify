import { Component } from '@angular/core';
import { AuthifyService } from './authify.service';
import { Observable } from 'rxjs';
import { AuthState } from '@authify/core';

@Component({
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
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  loading: boolean = false;
  state$: Observable<AuthState>;

  constructor(private authify: AuthifyService) {
    this.state$ = this.authify.state$;
  }

  async handleSignup(e: Event) {
    e.preventDefault();
    this.loading = true;
    try {
      await this.authify.signUp({
        email: this.email,
        password: this.password,
        name: this.name
      });
    } finally {
      this.loading = false;
    }
  }

  signInWithProvider(provider: 'google' | 'github') {
    this.authify.signInWithProvider(provider);
  }
}
