import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthifyProvider } from '@authify/react'

const authConfig = {
    clientId: 'dev_tenant_1',
    apiKey: 'dev_api_key_123',
    domain: 'localhost:5000'
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthifyProvider config={authConfig}>
            <App />
        </AuthifyProvider>
    </React.StrictMode>,
)
