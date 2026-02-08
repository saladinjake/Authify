// In-memory mock database to avoid sqlite3 binary issues on Windows/Node 24
export class MockDb {
  private tables: Record<string, any[]> = {
    tenants: [{ id: 'dev_tenant_1', name: 'Dev Team', api_key: 'dev_api_key_123', plan: 'free', usage_count: 0, mfa_enabled: 0 }],
    users: [],
    sessions: [],
    audit_logs: []
  };

  run(sql: string, params: any[] = [], callback?: (err: Error | null) => void) {
    // Basic SQL parser for INSERT/UPDATE
    if (sql.includes('INSERT INTO users')) {
      const [id, tenant_id, email, password, name, avatar_url] = params;
      const existing = this.tables.users.find(u => u.email === email && u.tenant_id === tenant_id);
      if (existing) {
        callback?.(new Error('USER_ALREADY_EXISTS'));
        return;
      }
      this.tables.users.push({ id, tenant_id, email, password, name, avatar_url });
    } else if (sql.includes('UPDATE tenants')) {
      const [id] = params;
      const tenant = this.tables.tenants.find(t => t.id === id);
      if (tenant) tenant.usage_count++;
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
