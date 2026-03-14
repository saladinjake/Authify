import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { AuthifyPlugin } from '@authify/vue'

const app = createApp(App)

app.use(AuthifyPlugin, {
    config: {
        clientId: 'dev_tenant_1',
        apiKey: 'dev_api_key_123',
        domain: 'localhost:5000',
        googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        googleClientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        googleCallbackUrl: import.meta.env.VITE_GOOGLE_CALLBACK_URL || 'http://localhost:4200/auth/callback'
    }
})

app.mount('#app')
