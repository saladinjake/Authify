import { Component } from '@angular/core';
import { AuthifyService } from '@authify/angular';
import { Observable } from 'rxjs';
import { AuthState } from '@authify/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; min-height: 100vh; background: #f5f5f5;">
      <nav style="width: 100%; padding: 1rem 2rem; background: white; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; box-sizing: border-box;">
        <span style="font-weight: bold; font-size: 1.2rem; color: #333;">Authify App</span>
        <authify-user-button></authify-user-button>
      </nav>

      <div style="margin-top: 4rem; background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; min-width: 350px;">
        <h1>Authify Angular Demo</h1>
        
        <div *ngIf="state$ | async as state">
          <div *ngIf="state.status === 'loading'">Loading Authify...</div>
          
          <div *ngIf="state.status === 'authenticated'">
            <h3>Welcome, {{ state.user?.name }}!</h3>
            <p>{{ state.user?.email }}</p>
            <button (click)="signOut()" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
              Sign Out
            </button>
            <div style="margin-top: 20px; text-align: left; background: #eee; padding: 10px; font-size: 12px; border-radius: 4px;">
              <pre>{{ state.user | json }}</pre>
            </div>
          </div>

          <div *ngIf="state.status === 'unauthenticated'">
            <div style="margin-bottom: 2rem; display: flex; justify-content: center; gap: 10px;">
              <button 
                (click)="view = 'signin'" 
                [style.font-weight]="view === 'signin' ? 'bold' : 'normal'"
                style="padding: 8px 16px; border: none; background: none; cursor: pointer; border-bottom: 2px solid;"
                [style.border-color]="view === 'signin' ? '#6366f1' : 'transparent'"
              >
                Sign In
              </button>
              <button 
                (click)="view = 'signup'" 
                [style.font-weight]="view === 'signup' ? 'bold' : 'normal'"
                style="padding: 8px 16px; border: none; background: none; cursor: pointer; border-bottom: 2px solid;"
                [style.border-color]="view === 'signup' ? '#6366f1' : 'transparent'"
              >
                Sign Up
              </button>
            </div>

            <authify-signin *ngIf="view === 'signin'"></authify-signin>
            <authify-signup *ngIf="view === 'signup'"></authify-signup>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  state$: Observable<AuthState>;
  view: 'signin' | 'signup' = 'signin';

  constructor(private authify: AuthifyService) {
    this.state$ = this.authify.state$;
  }

  signOut() {
    this.authify.signOut();
  }
}
