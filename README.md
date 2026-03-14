# Authify -  Authentication Platform

**Multi-tenant authentication infrastructure for modern applications**

Authify is an authentication platform that provides developers with a complete auth solution including email/password, magic links, social login (Google/GitHub), MFA, and subscription management.

## Features

### Core Authentication
- ✅ **Email/Password Authentication**- Secure bcrypt hashing
- ✅ **Magic Link (Passwordless)** - Passwordless entry with expiration
- ✅ **Social Login** - Support for Google and GitHub
- ✅ **Multi-Factor Authentication (MFA)** - TOTP simulation and verification
- ✅ **Generic Provider Routing** - Scalable architecture for adding new OAuth providers
- ✅ **JWKS & Key Rotation** - Secure JWT signing with public key exposure

### 🏢 Enterprise Features
- ✅ **Multi-Tenancy** - Fully isolated users and data based on API keys
- ✅ **Dynamic OAuth Credentials** - Supply your own Google/GitHub IDs via request headers for white-labeled auth
- ✅ **AJAX Initiation** - Secure login initiation via POST requests to avoid sensitive data in URLs
- ✅ **Rate Limiting** - Usage-based enforcement (Free tier: 200 events/month)
- ✅ **Subscription Management** - Integrated Paystack workflow for PRO upgrades
- ✅ **Identity Separation** - Users are scoped to tenants (User A on Tenant 1 is different from User A on Tenant 2)

### 🎨 Framework Support
-  **React** SDK - Full visibility with `AuthifyProvider` and hooks
-  **Vue 3** SDK - Seamless integration with `AuthifyPlugin`
-  **Angular** SDK - Service-based auth with `AuthifyModule`
-  **Vanilla JS** - Framework-agnostic core logic (@authify/core)

---

## 🚀 How it Works

Authify follows a **Headless-First** architecture designed for maximum flexibility and security.

### 1. Integration
Integrate one of our SDKs into your frontend. The SDK communicates with the Authify Backend using your **Tenant API Key**.

### 2. Dynamic Authentication Flow
Unlike traditional auth providers that require static server-side config, Authify allows **Dynamic Orchestration**:
- **Initiation**: When a user clicks "Sign in with Google", the SDK sends a POST request to `/auth/google`.
- **Header Injection**: The SDK injects your custom Google Client ID and Callback URL into the request headers.
- **Backend Picking**: The Authify Backend detects these headers and dynamically builds the OAuth URL for the user.
- **Callback & Handover**: After provider authentication, Authify handles the complex token exchange, creates/finds the user in your isolated tenant DB, and hands back a JWT to your frontend.

### 3. Isolated Tenancy
Every request is authenticated via `X-API-KEY`. This ensures that your users, sessions, and logs never leak into other tenants. Even if the same person uses two different apps powered by Authify, they are treated as unique identities within each tenant.

---

##  Quick Start

### 1. Start the Backend

```bash
cd Authify
npm install
npm run dev --workspace=@authify/backend
```

The backend will start on `http://localhost:5000`

**Default Credentials:**
- Tenant ID: `dev_tenant_1`
- API Key: `dev_api_key_123`

### 2. Run a Demo App

#### React Demo
```bash
npm run dev --workspace=react-demo
```
Open `http://localhost:4200`

#### Vue Demo
```bash
npm run dev --workspace=vue-demo
```
Open `http://localhost:4200`

#### Angular Demo
```bash
npm run dev --workspace=angular-demo
```
Open `http://localhost:4200`

### 3. Access Admin Dashboard

Open `examples/admin-dashboard/index.html` in your browser to:
- View your API key and tenant ID
- Monitor usage and rate limits
- Enable/disable MFA
- Rotate JWT signing keys
- Upgrade to PRO plan

---

## 📚 SDK Usage

### React

```tsx
import { AuthifyProvider, SignIn, UserButton, useAuth } from '@authify/react';

const config = {
  clientId: 'your_tenant_id',
  apiKey: 'your_api_key',
  domain: 'localhost:5000',
  // Optional: Supply your own Google/GitHub OAuth credentials
  googleClientId: '...',
  googleClientSecret: '...',
  googleCallbackUrl: '...',
  githubClientId: '...',
  githubClientSecret: '...',
  githubCallbackUrl: '...'
};

function App() {
  return (
    <AuthifyProvider config={config}>
      <MyApp />
    </AuthifyProvider>
  );
}

function MyApp() {
  const { isSignedIn, user } = useAuth();
  
  return isSignedIn ? <UserButton /> : <SignIn />;
}
```

### Vue

```vue
<script setup>
import { SignIn, UserButton, useAuth } from '@authify/vue';

const authConfig = {
  clientId: 'your_tenant_id',
  apiKey: 'your_api_key',
  domain: 'localhost:5000',
  googleClientId: '...',
  googleClientSecret: '...',
  googleCallbackUrl: '...',
  githubClientId: '...',
  githubClientSecret: '...',
  githubCallbackUrl: '...'
};

const { isSignedIn, user } = useAuth();
</script>

<template>
  <UserButton v-if="isSignedIn" />
  <SignIn v-else />
</template>
```

### Angular

```typescript
import { AuthifyModule } from '@authify/angular';

@NgModule({
  imports: [
    AuthifyModule.forRoot({
      clientId: 'your_tenant_id',
      apiKey: 'your_api_key',
      domain: 'localhost:5000',
      googleClientId: '...',
      googleClientSecret: '...',
      googleCallbackUrl: '...',
      githubClientId: '...',
      githubClientSecret: '...',
      githubCallbackUrl: '...'
    })
  ]
})
export class AppModule { }
```

---

## 🔑 API Endpoints

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/signup` | POST | Create new user account |
| `/auth/login` | POST | Login with email/password |
| `/auth/magic-link` | POST | Send magic link email |
| `/auth/mfa/verify` | POST | Verify MFA code |
| `/auth/:provider` | POST/GET | Initiate OAuth (Google, GitHub) |
| `/auth/:provider/callback` | GET | OAuth callback handler |

### Admin

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin/me` | GET | Get tenant information |
| `/admin/upgrade` | POST | Upgrade to PRO plan |
| `/admin/rotate-keys` | POST | Rotate JWT signing keys |

### JWKS

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/.well-known/jwks.json` | GET | Get public keys for JWT verification |

---

## 💳 Subscription Plans

### Free Tier
- ✅ 200 successful auth events/month
- ✅ Email/Password authentication
- ✅ Magic Links
- ✅ Social Login (Google, GitHub)
- ✅ Basic MFA support

### PRO Tier ($29/month)
- ✅ **Unlimited** auth events
- ✅ All Free tier features
- ✅ Advanced MFA options
- ✅ Priority support
- ✅ Custom branding

---

## 🔒 Security Features

### JWT & JWKS
- Automatic key rotation support
- Multiple active keys for zero-downtime rotation
- Standard JWKS endpoint for token verification

### Multi-Factor Authentication
- TOTP (Time-based One-Time Password)
- Email-based MFA
- SMS support (coming soon)

### Rate Limiting
- Per-tenant usage tracking
- Automatic enforcement at 200 events (free tier)
- Graceful upgrade prompts

---

## 🏗️ Architecture

```
┌─────────────────┐
│  React/Vue/     │
│  Angular Apps   │
└────────┬────────┘
         │
         ├─────────────────────────────┐
         │                             │
┌────────▼────────┐          ┌─────────▼────────┐
│  @authify/react │          │  @authify/core   │
│  @authify/vue   │──────────│  (State & API)   │
│  @authify/angular│         └─────────┬────────┘
└─────────────────┘                    │
                                       │
                          ┌────────────▼────────────┐
                          │  Backend (Express)      │
                          │  - Multi-tenancy        │
                          │  - Rate Limiting        │
                          │  - JWKS & Key Rotation  │
                          │  - Paystack Integration │
                          └────────────┬────────────┘
                                       │
                                ┌──────▼──────┐
                                │   SQLite    │
                                │   Database  │
                                └─────────────┘
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run core tests
npm test --workspace=@authify/core

# Run React tests
npm test --workspace=@authify/react
```

---

## 📦 Building

```bash
# Build all packages
npm run build

# Build specific package
npm run build --workspace=@authify/core
```

---

## 🛠️ Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
JWT_SECRET=your-super-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
PAYSTACK_SECRET_KEY=your-paystack-secret-key
```

---

## 📖 Documentation

- [Core API Reference](./packages/core/README.md)
- [React SDK Guide](./packages/react/README.md)
- [Vue SDK Guide](./packages/vue/README.md)
- [Angular SDK Guide](./packages/angular/README.md)

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) first.

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details

---

## 🎯 Roadmap

- [ ] SAML SSO support
- [ ] OIDC provider
- [ ] SCIM provisioning
- [ ] Webhooks
- [ ] Advanced analytics
- [ ] Custom domains
- [ ] White-label options

---

**Built with ❤️ for developers who need enterprise-grade auth without the complexity**
