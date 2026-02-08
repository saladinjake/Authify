import { ComponentValue } from '@angular/core';
import { Component } from '@angular/core';
import { AuthifyService } from './authify.service';

@Component({
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
})
export class UserProfileComponent {
    state$ = this.authify.state$;

    constructor(private authify: AuthifyService) { }

    signOut() {
        this.authify.signOut();
    }
}
