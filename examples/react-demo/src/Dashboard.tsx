import React, { useEffect, useState } from 'react';
import { useAuthClient, useUser } from '@authify/react';

export const Dashboard = () => {
    const client = useAuthClient();
    const { user } = useUser();
    const config = client.getConfig();
    const [tenant, setTenant] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const BACKEND_URL = `http://${config.domain}`;

    const loadTenantInfo = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/admin/me`, {
                headers: { 'X-API-KEY': config.apiKey }
            });
            const data = await res.json();
            setTenant(data);
        } catch (err) {
            console.error('Failed to load tenant info:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTenantInfo();
    }, []);

    const rotateKeys = async () => {
        if (!confirm('Are you sure you want to rotate your signing keys? This will invalidate existing tokens.')) return;
        try {
            const res = await fetch(`${BACKEND_URL}/admin/rotate-keys`, {
                method: 'POST',
                headers: { 'X-API-KEY': config.apiKey }
            });
            const data = await res.json();
            alert(`Keys rotated successfully! New KID: ${data.current_kid}`);
            loadTenantInfo();
        } catch (err) {
            alert('Failed to rotate keys');
        }
    };

    const upgradeToPro = async () => {
        const reference = 'ref_' + Math.random().toString(36).substr(2, 9);
        try {
            const res = await fetch(`${BACKEND_URL}/admin/upgrade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': config.apiKey
                },
                body: JSON.stringify({ reference })
            });
            await res.json();
            alert('Upgraded to PRO successfully!');
            loadTenantInfo();
        } catch (err) {
            alert('Upgrade failed');
        }
    };

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div style={{ marginTop: '40px', textAlign: 'left', width: '100%', maxWidth: '800px' }}>
            <h2 style={{ borderBottom: '2px solid #667eea', paddingBottom: '10px' }}>🔐 Admin Console</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', margin: '20px 0' }}>
                <div style={cardStyle}>
                    <div style={labelStyle}>Current Plan</div>
                    <div style={valueStyle}>{tenant?.plan?.toUpperCase() || 'FREE'}</div>
                </div>
                <div style={cardStyle}>
                    <div style={labelStyle}>Monthly Usage</div>
                    <div style={valueStyle}>{tenant?.usage_count || 0} / {tenant?.plan === 'free' ? '200' : '∞'}</div>
                </div>
                <div style={cardStyle}>
                    <div style={labelStyle}>MFA Status</div>
                    <div style={valueStyle}>{tenant?.mfa_enabled ? 'ENABLED' : 'DISABLED'}</div>
                </div>
            </div>

            {tenant?.plan === 'free' && tenant?.usage_count >= 150 && (
                <div style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)', color: 'white', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                    <strong>Warning:</strong> You are approaching your free tier limit. 
                    <button onClick={upgradeToPro} style={{ marginLeft: '15px', padding: '5px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Upgrade to PRO</button>
                </div>
            )}

            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3>API Configuration</h3>
                <div style={{ marginTop: '10px' }}>
                    <div style={configItemStyle}>
                        <strong>API Key:</strong> <code style={codeStyle}>{config.apiKey}</code>
                    </div>
                    <div style={configItemStyle}>
                        <strong>Tenant ID:</strong> <code style={codeStyle}>{config.clientId}</code>
                    </div>
                    <div style={configItemStyle}>
                        <strong>Backend:</strong> <code style={codeStyle}>{BACKEND_URL}</code>
                    </div>
                </div>
            </div>

            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                <h3>Security Operations</h3>
                <p style={{ fontSize: '14px', color: '#666', margin: '10px 0' }}>
                    Key rotation ensures that your signing keys are updated regularly. This is a critical security best practice.
                </p>
                <button onClick={rotateKeys} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
                    Rotate JWT Signing Keys
                </button>
            </div>
        </div>
    );
};

const cardStyle = {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

const labelStyle = { fontSize: '12px', opacity: 0.8, marginBottom: '5px' };
const valueStyle = { fontSize: '20px', fontWeight: 'bold' };
const configItemStyle = { margin: '10px 0', fontSize: '14px' };
const codeStyle = { background: '#eee', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' };
