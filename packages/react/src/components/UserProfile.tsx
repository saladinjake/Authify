import React, { useState } from 'react';
import { useAuth } from '../hooks';
import '@authify/core/styles.css';

export const UserProfile = () => {
    const { user, signOut, isLoaded, isSignedIn } = useAuth();
    const [editing, setEditing] = useState(false);

    if (!isLoaded || !isSignedIn || !user) return null;

    return (
        <div className="authify-card" style={{ maxWidth: '400px' }}>
            <div className="authify-profile-info">
                <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="authify-avatar-lg"
                />
                <div>
                    <h2 className="authify-title" style={{ margin: 0, fontSize: '20px' }}>{user.name}</h2>
                    <div style={{ color: '#888', fontSize: '14px' }}>{user.email}</div>
                </div>
            </div>

            <div className="authify-input-group">
                <label className="authify-label">User ID</label>
                <div className="authify-monospace">
                    {user.id}
                </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
                <button
                    className="authify-btn authify-btn-secondary"
                    onClick={() => setEditing(!editing)} // Placeholder
                >
                    Edit Profile
                </button>
                <button
                    className="authify-btn authify-btn-primary"
                    style={{ backgroundColor: '#ef4444', color: '#fff' }}
                    onClick={() => signOut()}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};
