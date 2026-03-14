import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthifyProvider } from '@authify/react'

const authConfig = {
    clientId: 'dev_tenant_1',
    apiKey: 'dev_api_key_123',
    domain: 'localhost:5000',
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    googleClientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    googleCallbackUrl: import.meta.env.VITE_GOOGLE_CALLBACK_URL || 'http://localhost:4200/auth/callback'
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthifyProvider config={authConfig}>
            <App />
        </AuthifyProvider>
    </React.StrictMode>,
)
