// src/api.ts
var BACKEND_URL = "http://localhost:5000";
var AuthApi = class {
  static setUrl(url) {
    BACKEND_URL = url.startsWith("http") ? url : `http://${url}`;
  }
  static async sendMagicLink(email, apiKey) {
    const res = await fetch(`${BACKEND_URL}/auth/magic-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey
      },
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to send magic link");
    }
  }
  static async verifyMagicLink(token) {
    const res = await fetch(`${BACKEND_URL}/auth/verify?token=${token}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Verification failed");
    return {
      token: data.token,
      user: data.user,
      expiresAt: Date.now() + 36e5
    };
  }
  static async login(email, password, apiKey) {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey
      },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    return data;
  }
  static async loginWithEmail(email, apiKey) {
    return this.sendMagicLink(email, apiKey);
  }
  static async signup(email, password, name, apiKey) {
    const res = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey
      },
      body: JSON.stringify({ email, password, name })
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Signup failed");
    }
    return res.json();
  }
  static async socialLogin(provider, clientId) {
    window.location.href = `${BACKEND_URL}/auth/${provider}?state=${clientId}`;
  }
  static async verifyMFA(mfaToken, code, apiKey) {
    const res = await fetch(`${BACKEND_URL}/auth/mfa/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey
      },
      body: JSON.stringify({ mfa_token: mfaToken, code })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "MFA verification failed");
    return data;
  }
  static async validateSession(token, apiKey) {
    const res = await fetch(`${BACKEND_URL}/auth/session`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "X-API-KEY": apiKey
      }
    });
    if (!res.ok) throw new Error("Session invalid");
    const data = await res.json();
    return {
      token,
      user: data.user,
      expiresAt: Date.now() + 36e5
    };
  }
  static async getTenant(apiKey) {
    const res = await fetch(`${BACKEND_URL}/admin/me`, {
      headers: { "X-API-KEY": apiKey }
    });
    if (!res.ok) throw new Error("Failed to fetch tenant info");
    return res.json();
  }
  static async upgradePlan(reference, apiKey) {
    const res = await fetch(`${BACKEND_URL}/admin/upgrade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey
      },
      body: JSON.stringify({ reference })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upgrade failed");
    return data;
  }
};

// src/store.ts
var AuthStore = class {
  state = {
    status: "loading",
    user: null,
    session: null,
    error: null,
    mfaChallenge: null
  };
  apiKey = null;
  listeners = /* @__PURE__ */ new Set();
  constructor(apiKey) {
    if (apiKey) this.apiKey = apiKey;
    this.hydrate();
  }
  setMFAChallenge(challenge) {
    this.setState({
      status: "mfa_challenge",
      mfaChallenge: challenge,
      error: null
    });
  }
  getState() {
    return this.state;
  }
  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }
  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this.notify();
  }
  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
  hydrate() {
    setTimeout(() => {
      if (typeof window === "undefined") {
        this.setState({ status: "unauthenticated" });
        return;
      }
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get("token");
      if (urlToken && this.apiKey) {
        window.history.replaceState({}, document.title, window.location.pathname);
        AuthApi.validateSession(urlToken, this.apiKey).then((session) => {
          this.setSession(session);
        }).catch(() => {
          this.setState({ status: "unauthenticated" });
        });
        return;
      }
      const stored = localStorage.getItem("authify_session");
      if (stored) {
        try {
          const session = JSON.parse(stored);
          if (this.apiKey) {
            AuthApi.validateSession(session.token, this.apiKey).then((validSession) => {
              this.setState({
                status: "authenticated",
                session: validSession,
                user: validSession.user
              });
            }).catch(() => {
              this.clearSession();
            });
          } else {
            this.setState({
              status: "authenticated",
              session,
              user: session.user
            });
          }
          return;
        } catch (e) {
          console.error("Failed to parse session", e);
        }
      }
      this.setState({ status: "unauthenticated" });
    }, 100);
  }
  setSession(session) {
    if (typeof window !== "undefined") {
      localStorage.setItem("authify_session", JSON.stringify(session));
    }
    this.setState({
      status: "authenticated",
      user: session.user,
      session,
      error: null,
      mfaChallenge: null
    });
  }
  clearSession() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authify_session");
    }
    this.setState({
      status: "unauthenticated",
      user: null,
      session: null,
      error: null,
      mfaChallenge: null
    });
  }
  setAwaitingVerification() {
    this.setState({
      status: "awaiting_verification",
      error: null
    });
  }
  setError(error) {
    this.setState({ error });
  }
};
var createStore = (apiKey) => new AuthStore(apiKey);

// src/client.ts
var AuthClient = class {
  store;
  config;
  constructor(config) {
    this.config = config;
    if (config.domain) {
      AuthApi.setUrl(config.domain);
    }
    this.store = new AuthStore(config.apiKey);
    this.applyTheme();
  }
  applyTheme() {
    if (!this.config.theme || typeof document === "undefined") return;
    const { theme } = this.config;
    const root = document.documentElement;
    if (theme.primaryColor) {
      root.style.setProperty("--authify-primary-color", theme.primaryColor);
      root.style.setProperty("--authify-btn-primary-bg", theme.primaryColor);
    }
    if (theme.borderRadius) {
      root.style.setProperty("--authify-radius", theme.borderRadius);
    }
    if (theme.fontFamily) {
      root.style.setProperty("--authify-font-family", theme.fontFamily);
    }
  }
  subscribe(cb) {
    return this.store.subscribe(cb);
  }
  get state() {
    return this.store.getState();
  }
  async signInWithEmail(email) {
    try {
      this.store.setError(null);
      console.log(`[Authify] Sending magic link to ${email} via ${this.config.domain}...`);
      await AuthApi.sendMagicLink(email, this.config.apiKey);
      this.store.setAwaitingVerification();
    } catch (err) {
      this.store.setError(err.message || "Failed to send magic link");
      throw err;
    }
  }
  async verifyMagicLink(token) {
    try {
      this.store.setError(null);
      console.log(`[Authify] Verifying token...`);
      const session = await AuthApi.verifyMagicLink(token);
      this.store.setSession(session);
    } catch (err) {
      this.store.setError(err.message || "Verification failed");
      throw err;
    }
  }
  async signOut() {
    console.log("[Authify] Signing out...");
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.store.clearSession();
  }
  async signInWithProvider(provider) {
    try {
      this.store.setError(null);
      console.log(`[Authify] Redirecting to ${provider}...`);
      await AuthApi.socialLogin(provider, this.config.clientId);
    } catch (err) {
      this.store.setError(err.message || "Social login failed");
      throw err;
    }
  }
  async signIn(credentials) {
    try {
      this.store.setError(null);
      if (!credentials.password) {
        return this.signInWithEmail(credentials.email);
      }
      const response = await AuthApi.login(credentials.email, credentials.password, this.config.apiKey);
      if (response.mfa_required) {
        this.store.setMFAChallenge({ token: response.mfa_token, type: "totp" });
        return;
      }
      this.store.setSession(response);
    } catch (err) {
      this.store.setError(err.message || "Login failed");
      throw err;
    }
  }
  async signUp(data) {
    try {
      this.store.setError(null);
      if (!data.password) {
        return this.signInWithEmail(data.email);
      }
      const response = await AuthApi.signup(data.email, data.password, data.name, this.config.apiKey);
      if (response.mfa_required) {
        this.store.setMFAChallenge({ token: response.mfa_token, type: "totp" });
        return;
      }
      this.store.setSession(response);
    } catch (err) {
      this.store.setError(err.message || "Signup failed");
      throw err;
    }
  }
  async verifyMFA(code) {
    try {
      this.store.setError(null);
      const state = this.store.getState();
      if (state.status !== "mfa_challenge" || !state.mfaChallenge) {
        throw new Error("No active MFA challenge");
      }
      const session = await AuthApi.verifyMFA(state.mfaChallenge.token, code, this.config.apiKey);
      this.store.setSession(session);
    } catch (err) {
      this.store.setError(err.message || "MFA verification failed");
      throw err;
    }
  }
};
function createAuthify(config) {
  return new AuthClient(config);
}
export {
  AuthApi,
  AuthClient,
  AuthStore,
  createAuthify,
  createStore
};
