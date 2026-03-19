import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthifyService } from './authify.service';

@Component({
  selector: 'authify-forgot-password',
  template: `
    <div class="authify-card">
      <h2 class="authify-title">Forgot Password</h2>
      <p style="color: #666; margin-bottom: 24px">
        Enter your email and we'll send you a 6-digit reset code.
      </p>

      <div *ngIf="state$ | async as state">
        <div *ngIf="state.error" class="authify-error">{{ state.error }}</div>
      </div>

      <form (submit)="handleSubmit($event)">
        <div class="authify-input-group">
          <label class="authify-label">Email</label>
          <input
            [(ngModel)]="email"
            name="email"
            type="email"
            class="authify-input"
            placeholder="you@example.com"
            required
          />
        </div>
        <button
          type="submit"
          [disabled]="loading"
          class="authify-btn authify-btn-primary"
        >
          {{ loading ? 'Sending Code...' : 'Send Reset Code' }}
        </button>
      </form>

      <button
        (click)="back.emit()"
        class="authify-btn authify-btn-secondary"
        style="margin-top: 12px"
      >
        Back to Sign In
      </button>
    </div>
  `,
})
export class ForgotPasswordComponent {
  email = '';
  loading = false;
  state$: Observable<any>;

  @Output() back = new EventEmitter<void>();
  @Output() sent = new EventEmitter<string>();

  constructor(private authService: AuthifyService) {
    this.state$ = this.authService.state$;
  }

  async handleSubmit(e: Event) {
    e.preventDefault();
    this.loading = true;
    try {
      await this.authService.forgotPassword(this.email);
      this.sent.emit(this.email);
    } catch (err) {
      // Error handled by store
    } finally {
      this.loading = false;
    }
  }
}
