import React from 'react';
import { SignIn, UserButton, useUser, useGoogleAuth } from '@authify/react';
import { Dashboard } from './Dashboard';
import '@authify/core/styles.css';

function App() {
    const { isSignedIn, user, isLoaded } = useUser();
    const { login } = useGoogleAuth();
    const [showDashboard, setShowDashboard] = React.useState(false);

    if (!isLoaded) return <div>Loading Authify...</div>;

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 20px',
            backgroundColor: '#f5f5f5',
            color: '#333'
        }}>
            <div style={{
                padding: '40px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: showDashboard ? '900px' : '400px',
                textAlign: 'center',
                transition: 'max-width 0.3s ease'
            }}>
                <h1 style={{ marginTop: 0, marginBottom: '24px' }}>Authify Demo</h1>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                    {isSignedIn ? (
                        <div style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ margin: 0 }}>Welcome back, {user?.name || 'User'}!</h3>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{user?.email}</p>
                                </div>
                                <UserButton />
                            </div>

                            {user?.role === 'admin' && (
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                    <button
                                        onClick={() => setShowDashboard(!showDashboard)}
                                        style={{
                                            flex: 1,
                                            padding: '10px',
                                            backgroundColor: showDashboard ? '#666' : '#667eea',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {showDashboard ? 'Hide Console' : 'Open Admin Console'}
                                    </button>
                                </div>
                            )}

                            {showDashboard ? (
                                <Dashboard />
                            ) : (
                                <div style={{ marginTop: '20px', padding: '15px', background: '#f8f8f8', borderRadius: '8px', textAlign: 'left' }}>
                                    <h4 style={{ marginTop: 0 }}>User Profile Data</h4>
                                    <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(user, null, 2)}</pre>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{ width: '100%' }}>
                            <p style={{ marginBottom: '20px', color: '#666' }}>Please sign in to continue</p>
                            <SignIn />
                            <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', color: '#ccc' }}>
                                <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
                                <span style={{ margin: '0 10px', fontSize: '12px' }}>OR</span>
                                <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
                            </div>
                            <button
                                onClick={login}
                                style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#4285F4',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    width: '100%',
                                    fontWeight: 'bold',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            >
                                Continue with Google
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
