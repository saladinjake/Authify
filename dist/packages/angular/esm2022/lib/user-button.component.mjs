import { Component, HostListener, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./authify.service";
import * as i2 from "@angular/common";
export class UserButtonComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: UserButtonComponent, deps: [{ token: i1.AuthifyService }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: () => [{ type: i1.AuthifyService }], propDecorators: { menuContainer: [{
                type: ViewChild,
                args: ['menuContainer']
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhci9zcmMvbGliL3VzZXItYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFxQy9FLE1BQU0sT0FBTyxtQkFBbUI7SUFNVjtJQUxwQixNQUFNLENBQXdCO0lBQzlCLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFFYSxhQUFhLENBQWM7SUFFdkQsWUFBb0IsT0FBdUI7UUFBdkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVk7UUFDckIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBR0QsZUFBZSxDQUFDLEtBQWlCO1FBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM1RSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQzt3R0F6QlUsbUJBQW1COzRGQUFuQixtQkFBbUIsaVBBOUJwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCVDs7NEZBRVUsbUJBQW1CO2tCQWhDL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0QlQ7aUJBQ0Y7bUZBSzZCLGFBQWE7c0JBQXhDLFNBQVM7dUJBQUMsZUFBZTtnQkFpQjFCLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQXV0aGlmeVNlcnZpY2UgfSBmcm9tICcuL2F1dGhpZnkuc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQXV0aFN0YXRlIH0gZnJvbSAnQGF1dGhpZnkvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2F1dGhpZnktdXNlci1idXR0b24nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2ICpuZ0lmPVwic3RhdGUkIHwgYXN5bmMgYXMgc3RhdGVcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgZGlzcGxheTogaW5saW5lLWJsb2NrO1wiICNtZW51Q29udGFpbmVyPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwic3RhdGUuc3RhdHVzID09PSAnYXV0aGVudGljYXRlZCcgJiYgc3RhdGUudXNlclwiPlxyXG4gICAgICAgIDxidXR0b24gKGNsaWNrKT1cInRvZ2dsZU1lbnUoJGV2ZW50KVwiIGNsYXNzPVwiYXV0aGlmeS11c2VyLWJ1dHRvbi10cmlnZ2VyXCI+XHJcbiAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgIFtzcmNdPVwic3RhdGUudXNlci5hdmF0YXJVcmwgfHwgJ2h0dHBzOi8vdWktYXZhdGFycy5jb20vYXBpLz9uYW1lPScgKyAoc3RhdGUudXNlci5uYW1lIHx8ICdVc2VyJylcIlxyXG4gICAgICAgICAgICBhbHQ9XCJQcm9maWxlXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJhdXRoaWZ5LWF2YXRhclwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNPcGVuXCIgY2xhc3M9XCJhdXRoaWZ5LWRyb3Bkb3duXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aGlmeS1kcm9wZG93bi1oZWFkZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhpZnktZHJvcGRvd24tbmFtZVwiPnt7IHN0YXRlLnVzZXIubmFtZSB8fCAnVXNlcicgfX08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhpZnktZHJvcGRvd24tZW1haWxcIj57eyBzdGF0ZS51c2VyLmVtYWlsIH19PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImF1dGhpZnktZHJvcGRvd24taXRlbVwiPk1hbmFnZSBBY2NvdW50PC9idXR0b24+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxidXR0b24gXHJcbiAgICAgICAgICAgIChjbGljayk9XCJzaWduT3V0KClcIiBcclxuICAgICAgICAgICAgY2xhc3M9XCJhdXRoaWZ5LWRyb3Bkb3duLWl0ZW0gYXV0aGlmeS1kcm9wZG93bi1pdGVtLWRhbmdlclwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIFNpZ24gT3V0XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVc2VyQnV0dG9uQ29tcG9uZW50IHtcclxuICBzdGF0ZSQ6IE9ic2VydmFibGU8QXV0aFN0YXRlPjtcclxuICBpc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnbWVudUNvbnRhaW5lcicpIG1lbnVDb250YWluZXIhOiBFbGVtZW50UmVmO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhpZnk6IEF1dGhpZnlTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnN0YXRlJCA9IHRoaXMuYXV0aGlmeS5zdGF0ZSQ7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVNZW51KGV2ZW50OiBFdmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLmlzT3BlbiA9ICF0aGlzLmlzT3BlbjtcclxuICB9XHJcblxyXG4gIHNpZ25PdXQoKSB7XHJcbiAgICB0aGlzLmF1dGhpZnkuc2lnbk91dCgpO1xyXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcclxuICBvbkRvY3VtZW50Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmlzT3BlbiAmJiAhdGhpcy5tZW51Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=