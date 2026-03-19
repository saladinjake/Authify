// In-memory mock database to avoid sqlite3 binary issues on Windows/Node 24
export class MockDb {
  private tables: Record<string, any[]> = {
    tenants: [{ id: 'dev_tenant_1', name: 'Dev Team', api_key: 'dev_api_key_123', plan: 'free', usage_count: 0, mfa_enabled: 0 }],
    users: [],
    sessions: [],
    audit_logs: [],
    password_resets: []
  };

  run(sql: string, params: any[] = [], callback?: (err: Error | null) => void) {
    // Basic SQL parser for INSERT/UPDATE
    if (sql.includes('INSERT INTO users')) {
      if (params.length === 6) {
          const [id, tenant_id, email, password, name, role] = params;
          this.tables.users.push({ id, tenant_id, email, password, name, role: role || 'user' });
      } else if (params.length === 5) {
          const [id, tenant_id, email, name, avatar_url] = params;
          this.tables.users.push({ id, tenant_id, email, name, avatar_url, role: 'user' });
      }
    } else if (sql.includes('UPDATE tenants')) {
      const [id] = params;
      const tenant = this.tables.tenants.find(t => t.id === id);
      if (tenant) tenant.usage_count++;
    } else if (sql.includes('INSERT INTO password_resets')) {
      const [email, tenant_id, code, expires_at] = params;
      // Remove old resets for this user/tenant
      this.tables.password_resets = this.tables.password_resets.filter(r => !(r.email === email && r.tenant_id === tenant_id));
      this.tables.password_resets.push({ email, tenant_id, code, expires_at });
    } else if (sql.includes('UPDATE users SET password = ?')) {
       const [newPassword, email, tenant_id] = params;
       const user = this.tables.users.find(u => u.email === email && u.tenant_id === tenant_id);
       if (user) user.password = newPassword;
    }

    setTimeout(() => callback?.(null), 10);
    return this;
  }

  get(sql: string, params: any[] = [], callback?: (err: Error | null, row: any) => void) {
    if (sql.includes('FROM tenants WHERE api_key = ?')) {
      const row = this.tables.tenants.find(t => t.api_key === params[0]);
      callback?.(null, row);
    } else if (sql.includes('FROM users WHERE email = ? AND tenant_id = ?')) {
      const row = this.tables.users.find(u => u.email === params[0] && u.tenant_id === params[1]);
      callback?.(null, row);
    } else if (sql.includes('FROM users WHERE id = ?')) {
      const row = this.tables.users.find(u => u.id === params[0]);
      callback?.(null, row);
    } else if (sql.includes('SELECT COUNT(*) as count FROM users WHERE tenant_id = ?')) {
      const count = this.tables.users.filter(u => u.tenant_id === params[0]).length;
      callback?.(null, { count });
    } else if (sql.includes('FROM password_resets WHERE email = ? AND tenant_id = ? AND code = ?')) {
      const [email, tenant_id, code] = params;
      const row = this.tables.password_resets.find(r => r.email === email && r.tenant_id === tenant_id && r.code === code);
      callback?.(null, row);
    }
    return this;
  }

  serialize(callback: () => void) {
    callback();
  }
}

export const db = new MockDb() as any;

export const initDb = async () => {
  console.log('[Authify] Using in-memory mock database');
  return Promise.resolve();
};
