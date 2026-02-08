import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./authify.service";
import * as i2 from "@angular/common";
export class UserProfileComponent {
    authify;
    state$;
    constructor(authify) {
        this.authify = authify;
        this.state$ = this.authify.state$;
    }
    signOut() {
        this.authify.signOut();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: UserProfileComponent, deps: [{ token: i1.AuthifyService }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: () => [{ type: i1.AuthifyService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXIvc3JjL2xpYi91c2VyLXByb2ZpbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUE2QzFDLE1BQU0sT0FBTyxvQkFBb0I7SUFHWDtJQUZwQixNQUFNLENBQXdCO0lBRTlCLFlBQW9CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3pCLENBQUM7d0dBVFUsb0JBQW9COzRGQUFwQixvQkFBb0IsNERBdENyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NUOzs0RkFFVSxvQkFBb0I7a0JBeENoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NUO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEF1dGhpZnlTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoaWZ5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEF1dGhTdGF0ZSB9IGZyb20gJ0BhdXRoaWZ5L2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhdXRoaWZ5LXVzZXItcHJvZmlsZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgKm5nSWY9XCJzdGF0ZSQgfCBhc3luYyBhcyBzdGF0ZVwiIGNsYXNzPVwiYXV0aGlmeS1jb250YWluZXJcIj5cclxuICAgICAgPGRpdiAqbmdJZj1cInN0YXRlLnN0YXR1cyA9PT0gJ2F1dGhlbnRpY2F0ZWQnICYmIHN0YXRlLnVzZXJcIiBjbGFzcz1cImF1dGhpZnktY2FyZFwiIHN0eWxlPVwibWF4LXdpZHRoOiA0MDBweDtcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aGlmeS1wcm9maWxlLWluZm9cIj5cclxuICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgW3NyY109XCJzdGF0ZS51c2VyLmF2YXRhclVybFwiXHJcbiAgICAgICAgICAgIFthbHRdPVwic3RhdGUudXNlci5uYW1lXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJhdXRoaWZ5LWF2YXRhci1sZ1wiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGgyIGNsYXNzPVwiYXV0aGlmeS10aXRsZVwiIHN0eWxlPVwibWFyZ2luOiAwOyBmb250LXNpemU6IDIwcHg7XCI+e3sgc3RhdGUudXNlci5uYW1lIH19PC9oMj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImNvbG9yOiAjODg4OyBmb250LXNpemU6IDE0cHg7XCI+e3sgc3RhdGUudXNlci5lbWFpbCB9fTwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhdXRoaWZ5LWlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhdXRoaWZ5LWxhYmVsXCI+VXNlciBJRDwvbGFiZWw+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aGlmeS1tb25vc3BhY2VcIj5cclxuICAgICAgICAgICAge3sgc3RhdGUudXNlci5pZCB9fVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tdG9wOiAyNHB4OyBkaXNwbGF5OiBmbGV4OyBnYXA6IDEwcHg7XCI+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYXV0aGlmeS1idG4gYXV0aGlmeS1idG4tc2Vjb25kYXJ5XCI+XHJcbiAgICAgICAgICAgIEVkaXQgUHJvZmlsZVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIChjbGljayk9XCJzaWduT3V0KClcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImF1dGhpZnktYnRuIGF1dGhpZnktYnRuLXByaW1hcnlcIlxyXG4gICAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNlZjQ0NDQ7IGNvbG9yOiB3aGl0ZTtcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICBTaWduIE91dFxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXNlclByb2ZpbGVDb21wb25lbnQge1xyXG4gIHN0YXRlJDogT2JzZXJ2YWJsZTxBdXRoU3RhdGU+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhpZnk6IEF1dGhpZnlTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnN0YXRlJCA9IHRoaXMuYXV0aGlmeS5zdGF0ZSQ7XHJcbiAgfVxyXG5cclxuICBzaWduT3V0KCkge1xyXG4gICAgdGhpcy5hdXRoaWZ5LnNpZ25PdXQoKTtcclxuICB9XHJcbn1cclxuIl19