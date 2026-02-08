import { useState } from 'react';
import { useAuth } from '../hooks';

export const SignIn = () => {
    const { signIn, signUp, signInWithProvider, error, isLoaded, isAwaitingVerification, isMFAChallenge, verifyMFA } = useAuth();
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mfaCode, setMfaCode] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isLoaded) return <div>Loading...</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (mode === 'signin') {
                if (password) {
                    await signIn({ email, password });
                } else {
                    await signIn(email);
                }
            } else {
                if (password) {
                    await signUp({ email, password, name });
                } else {
                    await signIn(email);
                }
            }
        } catch (err) {
            console.error('Auth error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleMFASubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await verifyMFA(mfaCode);
        } catch (err) {
            console.error('MFA error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (isMFAChallenge) {
        return (
            <div className="authify-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
                <h2 className="authify-title">Two-Factor Authentication</h2>
                <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.5' }}>
                    Enter the 6-digit code from your authenticator app
                </p>
                {error && <div className="authify-error">{error}</div>}
                <form onSubmit={handleMFASubmit}>
                    <div className="authify-input-group">
                        <input
                            type="text"
                            value={mfaCode}
                            onChange={(e) => setMfaCode(e.target.value)}
                            className="authify-input"
                            required
                            placeholder="000000"
                            maxLength={6}
                            pattern="[0-9]{6}"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="authify-btn authify-btn-primary"
                    >
                        {loading ? 'Verifying...' : 'Verify Code'}
                    </button>
                </form>
            </div>
        );
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
            <h2 className="authify-title">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
            {error && <div className="authify-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                {mode === 'signup' && (
                    <div className="authify-input-group">
                        <label className="authify-label">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="authify-input"
                            required
                            placeholder="John Doe"
                        />
                    </div>
                )}
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
                    <label className="authify-label">Password (optional)</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="authify-input"
                        placeholder="Leave blank for magic link"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="authify-btn authify-btn-primary"
                >
                    {loading ? 'Processing...' : (password ? (mode === 'signin' ? 'Sign In' : 'Sign Up') : 'Continue with Email')}
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

            <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <button
                    onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                    className="authify-btn authify-btn-secondary"
                    style={{ background: 'transparent', border: 'none', color: '#666', textDecoration: 'underline' }}
                >
                    {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
            </div>
        </div>
    );
};
