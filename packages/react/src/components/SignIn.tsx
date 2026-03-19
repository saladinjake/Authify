import React, { useState } from 'react';
import { useAuth } from '../hooks';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';

export const SignIn = () => {
    const { signIn, signInWithProvider, error, isLoaded, isAwaitingVerification } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState<'signin' | 'forgot' | 'reset'>('signin');
    const [resetEmail, setResetEmail] = useState('');

    if (!isLoaded) return <div>Loading...</div>;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signIn({ email, password });
        } catch (err) {
            // Error handled by store/hook
        } finally {
            setLoading(false);
        }
    };

    if (view === 'forgot') {
        return <ForgotPassword 
            onBack={() => setView('signin')} 
            onSent={(mail) => {
                setResetEmail(mail);
                setView('reset');
            }} 
        />;
    }

    if (view === 'reset') {
        return <ResetPassword 
            email={resetEmail} 
            onBack={() => setView('signin')}
            onSuccess={() => setView('signin')}
        />;
    }

    if (isAwaitingVerification) {
        return (
            <div className="authify-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</div>
                <h2 className="authify-title">Check your email</h2>
                <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.5' }}>
                    We've sent a magic link to <strong>{email}</strong>.<br />
                    Click the link in the email to sign in.
                </p>
                <div className="authify-divider"></div>
                <button
                    onClick={() => window.location.reload()}
                    className="authify-btn authify-btn-secondary"
                >
                    Back to Sign In
                </button>
            </div>
        );
    }

    return (
        <div className="authify-card">
            <h2 className="authify-title">Sign In</h2>
            {error && <div className="authify-error">{error}</div>}

            <form onSubmit={handleLogin}>
                <div className="authify-input-group">
                    <label className="authify-label">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="authify-input"
                        required
                        placeholder="you@example.com"
                    />
                </div>
                <div className="authify-input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label className="authify-label">Password</label>
                        <button 
                            type="button"
                            onClick={() => setView('forgot')}
                            style={{ background: 'none', border: 'none', padding: 0, color: 'var(--authify-primary-color)', fontSize: '12px', cursor: 'pointer' }}
                        >
                            Forgot password?
                        </button>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="authify-input"
                        placeholder="••••••••"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="authify-btn authify-btn-primary"
                >
                    {loading ? 'Signing in...' : (password ? 'Sign In' : 'Continue with Email')}
                </button>
            </form>

            <div className="authify-divider">or</div>

            <div className="authify-social-stack">
                <button
                    onClick={() => signInWithProvider('google')}
                    className="authify-btn authify-btn-secondary"
                >
                    Sign in with Google
                </button>
                <button
                    onClick={() => signInWithProvider('github')}
                    className="authify-btn authify-btn-primary"
                    style={{ background: '#333', border: '1px solid #333' }}
                >
                    Sign in with GitHub
                </button>
            </div>
        </div>
    );
};
