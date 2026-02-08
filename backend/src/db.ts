import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../../authify.db');

export const db = new sqlite3.Database(dbPath);

export const initDb = () => {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      // Tenants (Developers)
      db.run(`CREATE TABLE IF NOT EXISTS tenants (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        api_key TEXT UNIQUE NOT NULL,
        
        redirect_urls TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) reject(err);
      });

      // Users (End users belonging to a tenant)
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        tenant_id TEXT NOT NULL,
        email TEXT NOT NULL,
       
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id),
        UNIQUE(tenant_id, email)
      )`);

      // Sessions
      db.run(`CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        device TEXT,
    
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`);

      // Audit Logs
      db.run(`CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event TEXT NOT NULL,
        actor TEXT,
        
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Seed a default tenant for testing
      db.run(`INSERT OR IGNORE INTO tenants (id, name, api_key, plan) 
              VALUES ('dev_tenant_1', 'Dev Team', 'dev_api_key_123', 'free')`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
};
