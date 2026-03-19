import React, { useState } from 'react';
import { useAuth } from '../hooks';

export const ForgotPassword = ({ onBack, onSent }: { onBack: () => void, onSent: (email: string) => void }) => {
    const { forgotPassword, error } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await forgotPassword(email);
            onSent(email);
        } catch (err) {
            // Error handled by store
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="authify-card">
            <h2 className="authify-title">Forgot Password</h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>Enter your email and we'll send you a 6-digit reset code.</p>
            
            {error && <div className="authify-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="authify-input-group">
                    <label className="authify-label">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="authify-input"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="authify-btn authify-btn-primary"
                >
                    {loading ? 'Sending Code...' : 'Send Reset Code'}
                </button>
            </form>
            
            <button
                onClick={onBack}
                className="authify-btn authify-btn-secondary"
                style={{ marginTop: '12px' }}
            >
                Back to Sign In
            </button>
        </div>
    );
};
