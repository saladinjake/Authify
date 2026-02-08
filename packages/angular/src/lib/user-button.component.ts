import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AuthifyService } from './authify.service';

@Component({
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
})
export class UserButtonComponent {
    state$ = this.authify.state$;
    isOpen = false;

    @ViewChild('menuContainer') menuContainer!: ElementRef;

    constructor(private authify: AuthifyService) { }

    toggleMenu(event: Event) {
        event.stopPropagation();
        this.isOpen = !this.isOpen;
    }

    signOut() {
        this.authify.signOut();
        this.isOpen = false;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (this.isOpen && !this.menuContainer.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }
}
