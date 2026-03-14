import { Component, OnInit } from '@angular/core';
import { AuthifyService } from '@authify/angular';

@Component({
  selector: 'app-dashboard',
  template: `
    <div *ngIf="loading">Loading dashboard...</div>
    <div *ngIf="!loading && tenant" class="admin-dashboard">
      <h2 style="border-bottom: 2px solid #667eea; padding-bottom: 10px;">🔐 Admin Console (Angular)</h2>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0;">
        <div style="background: #764ba2; color: white; padding: 15px; border-radius: 8px;">
          <span style="display: block; font-size: 10px; opacity: 0.8;">Plan</span>
          <span style="font-size: 18px; font-weight: bold;">{{ tenant.plan | uppercase }}</span>
        </div>
        <div style="background: #764ba2; color: white; padding: 15px; border-radius: 8px;">
          <span style="display: block; font-size: 10px; opacity: 0.8;">Usage</span>
          <span style="font-size: 18px; font-weight: bold;">{{ tenant.usage_count }} / {{ tenant.plan === 'free' ? '200' : '∞' }}</span>
        </div>
        <div style="background: #764ba2; color: white; padding: 15px; border-radius: 8px;">
          <span style="display: block; font-size: 10px; opacity: 0.8;">MFA</span>
          <span style="font-size: 18px; font-weight: bold;">{{ tenant.mfa_enabled ? 'ON' : 'OFF' }}</span>
        </div>
      </div>

      <div *ngIf="tenant.plan === 'free' && tenant.usage_count >= 150" style="background: #f5576c; color: white; padding: 10px; border-radius: 6px; margin-bottom: 20px;">
        Approaching limit! <button (click)="upgradeToPro()" style="margin-left: 10px; cursor: pointer;">Go PRO</button>
      </div>

      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <h3>Configuration</h3>
        <p style="font-size: 14px;"><strong>API Key:</strong> <code style="background: #eee; padding: 2px 5px; border-radius: 4px;">{{ config.apiKey }}</code></p>
        <p style="font-size: 14px;"><strong>Tenant ID:</strong> <code style="background: #eee; padding: 2px 5px; border-radius: 4px;">{{ config.clientId }}</code></p>
      </div>

      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <h3>Security</h3>
        <button (click)="rotateKeys()" style="background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
          Rotate Signing Keys
        </button>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard { margin-top: 40px; text-align: left; }
  `]
})
export class DashboardComponent implements OnInit {
  tenant: any;
  config: any;
  loading = true;

  constructor(private authify: AuthifyService) {
    this.config = this.authify.getConfig();
  }

  ngOnInit() {
    this.loadTenantInfo();
  }

  async loadTenantInfo() {
    const BACKEND_URL = `http://${this.config.domain}`;
    try {
      const res = await fetch(`${BACKEND_URL}/admin/me`, {
        headers: { 
          'X-API-KEY': this.config.apiKey,
          'Authorization': `Bearer ${this.authify.state.session?.token}`
        }
      });
      if (!res.ok) throw new Error('Unauthorized');
      this.tenant = await res.json();
    } catch (err) {
      console.error('Failed to load tenant info:', err);
    } finally {
      this.loading = false;
    }
  }

  async rotateKeys() {
    if (!confirm('Are you sure you want to rotate your signing keys?')) return;
    const BACKEND_URL = `http://${this.config.domain}`;
    try {
      const res = await fetch(`${BACKEND_URL}/admin/rotate-keys`, {
        method: 'POST',
        headers: { 
          'X-API-KEY': this.config.apiKey,
          'Authorization': `Bearer ${this.authify.state.session?.token}`
        }
      });
      const data = await res.json();
      alert(`Keys rotated! New KID: ${data.current_kid}`);
      this.loadTenantInfo();
    } catch (err) {
      alert('Rotation failed');
    }
  }

  async upgradeToPro() {
    const BACKEND_URL = `http://${this.config.domain}`;
    const reference = 'ref_' + Math.random().toString(36).substr(2, 9);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/upgrade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this.config.apiKey,
          'Authorization': `Bearer ${this.authify.state.session?.token}`
        },
        body: JSON.stringify({ reference })
      });
      await res.json();
      alert('Upgraded to PRO!');
      this.loadTenantInfo();
    } catch (err) {
      alert('Upgrade failed');
    }
  }
}
