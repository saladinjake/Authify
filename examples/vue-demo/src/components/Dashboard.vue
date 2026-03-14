<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthClient, useAuth } from '@authify/vue';

const client = useAuthClient();
const { user } = useAuth();
const config = client.getConfig();
const tenant = ref<any>(null);
const loading = ref(true);

const BACKEND_URL = `http://${config.domain}`;

const loadTenantInfo = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/admin/me`, {
            headers: { 'X-API-KEY': config.apiKey, 'Authorization': `Bearer ${client.state.session?.token}` }
        });
        if (!res.ok) throw new Error('Unauthorized');
        tenant.value = await res.json();
    } catch (err) {
        console.error('Failed to load tenant info:', err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadTenantInfo();
});

const rotateKeys = async () => {
    if (!confirm('Are you sure you want to rotate your signing keys?')) return;
    try {
        const res = await fetch(`${BACKEND_URL}/admin/rotate-keys`, {
            method: 'POST',
            headers: { 
                'X-API-KEY': config.apiKey,
                'Authorization': `Bearer ${client.state.session?.token}`
            }
        });
        const data = await res.json();
        alert(`Keys rotated! New KID: ${data.current_kid}`);
        loadTenantInfo();
    } catch (err) {
        alert('Rotation failed');
    }
};

const upgradeToPro = async () => {
    const reference = 'ref_' + Math.random().toString(36).substr(2, 9);
    try {
        const res = await fetch(`${BACKEND_URL}/admin/upgrade`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': config.apiKey,
                'Authorization': `Bearer ${client.state.session?.token}`
            },
            body: JSON.stringify({ reference })
        });
        await res.json();
        alert('Upgraded to PRO!');
        loadTenantInfo();
    } catch (err) {
        alert('Upgrade failed');
    }
};
</script>

<template>
    <div v-if="loading">Loading dashboard...</div>
    <div v-else class="admin-dashboard">
        <h2>🔐 Admin Console (Vue)</h2>
        
        <div class="stats-grid">
            <div class="stat-card">
                <span class="label">Plan</span>
                <span class="value">{{ tenant?.plan?.toUpperCase() }}</span>
            </div>
            <div class="stat-card">
                <span class="label">Usage</span>
                <span class="value">{{ tenant?.usage_count }} / {{ tenant?.plan === 'free' ? '200' : '∞' }}</span>
            </div>
            <div class="stat-card">
                <span class="label">MFA</span>
                <span class="value">{{ tenant?.mfa_enabled ? 'ON' : 'OFF' }}</span>
            </div>
        </div>

        <div v-if="tenant?.plan === 'free' && tenant?.usage_count >= 150" class="promo-banner">
            Approaching limit! <button @click="upgradeToPro">Go PRO</button>
        </div>

        <div class="config-section">
            <h3>Configuration</h3>
            <p><strong>API Key:</strong> <code>{{ config.apiKey }}</code></p>
            <p><strong>Tenant ID:</strong> <code>{{ config.clientId }}</code></p>
        </div>

        <div class="action-section">
            <h3>Security</h3>
            <button @click="rotateKeys" class="danger-btn">Rotate Signing Keys</button>
        </div>
    </div>
</template>

<style scoped>
.admin-dashboard { margin-top: 40px; text-align: left; }
.stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0; }
.stat-card { background: #764ba2; color: white; padding: 15px; border-radius: 8px; }
.label { display: block; font-size: 10px; opacity: 0.8; }
.value { font-size: 18px; font-weight: bold; }
.promo-banner { background: #f5576c; color: white; padding: 10px; border-radius: 6px; margin-bottom: 20px; }
.config-section, .action-section { background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
code { background: #eee; padding: 2px 5px; border-radius: 4px; }
.danger-btn { background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
</style>
