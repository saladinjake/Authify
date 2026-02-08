import { SignIn, UserButton, useUser } from '@authify/react';
import '@authify/core/styles.css'; // Import the CSS

function App() {
    const { isSignedIn, user, isLoaded } = useUser();

    if (!isLoaded) return <div>Loading Authify...</div>;

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            color: '#333'
        }}>
            <div style={{
                padding: '40px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                minWidth: '400px',
                textAlign: 'center'
            }}>
                <h1 style={{ marginTop: 0, marginBottom: '24px' }}>Authify Demo</h1>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    {isSignedIn ? (
                        <div>
                            <h3>Welcome back!</h3>
                            <UserButton />
                        </div>
                    ) : (
                        <div style={{ width: '100%' }}>
                            <p style={{ marginBottom: '20px', color: '#666' }}>Please sign in to continue</p>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <SignIn />
                            </div>
                        </div>
                    )}
                </div>

                {isSignedIn && (
                    <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '4px', textAlign: 'left', fontSize: '12px' }}>
                        <pre>{JSON.stringify(user, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
