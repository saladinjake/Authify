import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthifyService } from './authify.service';

@Component({
  selector: 'authify-reset-password',
  template: `
    <div *ngIf="successMsg" class="authify-card" style="text-align: center">
      <div style="font-size: 48px; margin-bottom: 16px">✅</div>
      <h2 class="authify-title">Success!</h2>
      <p style="color: #059669; font-weight: 500">{{ successMsg }}</p>
      <p style="color: #666; margin-top: 12px">Redirecting to sign in...</p>
    </div>

    <div *ngIf="!successMsg" class="authify-card">
      <div style="color: #059669; background-color: #ecfdf5; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; text-align: center">
        ✅ Reset code sent to your email!
      </div>
      <h2 class="authify-title">
        {{ step === 'verify' ? 'Verify Code' : 'New Password' }}
      </h2>
      <p style="color: #666; margin-bottom: 24px">
        {{
          step === 'verify'
            ? 'Enter the 6-digit code sent to ' + email
            : 'Enter your new password below.'
        }}
      </p>

      <div *ngIf="state$ | async as state">
        <div *ngIf="state.error" class="authify-error">{{ state.error }}</div>
      </div>

      <div
        *ngIf="step === 'verify'"
        style="display: flex; gap: 8px; justify-content: center; margin-bottom: 24px"
      >
        <input
          *ngFor="let digit of code; let idx = index"
          #inputBox
          type="password"
          maxlength="1"
          [(ngModel)]="code[idx]"
          class="authify-input"
          style="width: 45px; textAlign: center; fontSize: 20px"
          (input)="handleInput(idx)"
          (keydown.backspace)="handleDelete(idx)"
        />
      </div>

      <form *ngIf="step === 'reset'" (submit)="handleReset($event)">
        <div class="authify-input-group">
          <label class="authify-label">New Password</label>
          <input
            [(ngModel)]="newPassword"
            name="newPassword"
            type="password"
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
          {{ loading ? 'Resetting...' : 'Reset Password' }}
        </button>
      </form>

      <button
        (click)="back.emit()"
        class="authify-btn authify-btn-secondary"
        style="margin-top: 12px"
      >
        Cancel
      </button>
    </div>
  `,
})
export class ResetPasswordComponent implements AfterViewInit {
  @Input() email = '';
  @Output() back = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  @ViewChildren('inputBox') inputBoxes!: QueryList<ElementRef>;

  code = ['', '', '', '', '', ''];
  newPassword = '';
  step: 'verify' | 'reset' = 'verify';
  loading = false;
  successMsg = '';
  state$: Observable<any>;

  constructor(private authService: AuthifyService) {
      this.state$ = this.authService.state$;
  }

  ngAfterViewInit() {
    this.focusInput(0);
  }

  handleInput(idx: number) {
    if (this.code[idx] && idx < 5) {
      this.focusInput(idx + 1);
    }
    if (this.code.join('').length === 6 && this.step === 'verify') {
      this.handleVerify();
    }
  }

  handleDelete(idx: number) {
    if (!this.code[idx] && idx > 0) {
      this.focusInput(idx - 1);
    }
  }

  focusInput(idx: number) {
    setTimeout(() => {
        const input = this.inputBoxes.toArray()[idx];
        if (input) input.nativeElement.focus();
    }, 0);
  }

  async handleVerify() {
    this.loading = true;
    try {
      await this.authService.verifyResetCode(this.email, this.code.join(''));
      this.step = 'reset';
    } catch (err) {
      // Handled
    } finally {
      this.loading = false;
    }
  }

  async handleReset(e: Event) {
    e.preventDefault();
    this.loading = true;
    try {
      await this.authService.resetPassword(this.email, this.code.join(''), this.newPassword);
      this.successMsg = 'Your password has been reset successfully!';
      setTimeout(() => this.success.emit(), 3000);
    } catch (err) {
      // Handled
    } finally {
      this.loading = false;
    }
  }
}
