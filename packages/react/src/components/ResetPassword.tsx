import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks';

export const ResetPassword = ({ email, onBack, onSuccess }: { email: string, onBack: () => void, onSuccess: () => void }) => {
    const { verifyResetCode, resetPassword, error } = useAuth();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState<'verify' | 'reset'>('verify');
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) value = value[0];
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        const fullCode = code.join('');
        if (fullCode.length === 6 && step === 'verify') {
            handleVerifyCode(fullCode);
        }
    }, [code]);

    const handleVerifyCode = async (fullCode: string) => {
        setLoading(true);
        try {
            await verifyResetCode(email, fullCode);
            setStep('reset');
        } catch (err) {
            // Error handled by store
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await resetPassword(email, code.join(''), newPassword);
            setSuccessMsg('Your password has been reset successfully!');
            setTimeout(onSuccess, 3000);
        } catch (err) {
            // Error handled by store
        } finally {
            setLoading(false);
        }
    };

    if (successMsg) {
        return (
            <div className="authify-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h2 className="authify-title">Success!</h2>
                <p style={{ color: '#059669', fontWeight: '500' }}>{successMsg}</p>
                <p style={{ color: '#666', marginTop: '12px' }}>Redirecting to sign in...</p>
            </div>
        );
    }

    return (
        <div className="authify-card">
            <div style={{ color: '#059669', backgroundColor: '#ecfdf5', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
                ✅ Reset code sent to your email!
            </div>
            <h2 className="authify-title">{step === 'verify' ? 'Verify Code' : 'New Password'}</h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>
                {step === 'verify' 
                    ? `Enter the 6-digit code sent to ${email}`
                    : 'Enter your new password below.'}
            </p>

            {error && <div className="authify-error">{error}</div>}

            {step === 'verify' ? (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
                    {code.map((digit, idx) => (
                        <input
                            key={idx}
                            ref={el => inputRefs.current[idx] = el}
                            type="password"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleCodeChange(idx, e.target.value)}
                            onKeyDown={e => handleKeyDown(idx, e)}
                            className="authify-input"
                            style={{ width: '45px', textAlign: 'center', fontSize: '20px' }}
                            autoComplete="one-time-code"
                        />
                    ))}
                </div>
            ) : (
                <form onSubmit={handleResetPassword}>
                    <div className="authify-input-group">
                        <label className="authify-label">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className="authify-input"
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="authify-btn authify-btn-primary"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            )}

            <button
                onClick={onBack}
                className="authify-btn authify-btn-secondary"
                style={{ marginTop: '12px' }}
            >
                Cancel
            </button>
        </div>
    );
};
