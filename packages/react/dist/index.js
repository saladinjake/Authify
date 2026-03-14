"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AuthifyProvider: () => AuthifyProvider,
  Protected: () => Protected,
  SignIn: () => SignIn,
  UserButton: () => UserButton,
  UserProfile: () => UserProfile,
  useAuth: () => useAuth,
  useAuthClient: () => useAuthClient,
  useAuthState: () => useAuthState,
  useGoogleAuth: () => useGoogleAuth,
  useUser: () => useUser
});
module.exports = __toCommonJS(index_exports);

// src/context.tsx
var import_react = require("react");
var import_core = require("@authify/core");
var import_jsx_runtime = require("react/jsx-runtime");
var AuthContext = (0, import_react.createContext)(null);
var AuthStateContext = (0, import_react.createContext)(null);
var AuthifyProvider = ({ children, client, config }) => {
  const [authClient] = (0, import_react.useState)(() => {
    if (client) return client;
    if (config) return (0, import_core.createAuthify)(config);
    throw new Error("AuthifyProvider requires either client or config.");
  });
  const [state, setState] = (0, import_react.useState)(authClient.state);
  (0, import_react.useEffect)(() => {
    const unsubscribe = authClient.subscribe((newState) => {
      setState(newState);
    });
    return () => unsubscribe();
  }, [authClient]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, { value: authClient, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthStateContext.Provider, { value: state, children }) });
};
var useAuthClient = () => {
  const context = (0, import_react.useContext)(AuthContext);
  if (!context) {
    throw new Error("useAuthClient must be used within an AuthifyProvider");
  }
  return context;
};
var useAuthState = () => {
  const context = (0, import_react.useContext)(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within an AuthifyProvider");
  }
  return context;
};

// src/hooks.ts
var import_react2 = require("react");
var useAuth = () => {
  const client = useAuthClient();
  const state = useAuthState();
  const signIn = (0, import_react2.useCallback)((email) => client.signInWithEmail(email), [client]);
  const signOut = (0, import_react2.useCallback)(() => client.signOut(), [client]);
  const signInWithProvider = (0, import_react2.useCallback)((provider) => client.signInWithProvider(provider), [client]);
  const verifyMFA = (0, import_react2.useCallback)((code) => client.verifyMFA(code), [client]);
  return {
    status: state.status,
    isLoaded: state.status !== "loading",
    isSignedIn: state.status === "authenticated",
    isAwaitingVerification: state.status === "awaiting_verification",
    isMFAChallenge: state.status === "mfa_challenge",
    mfaChallenge: state.mfaChallenge,
    user: state.user,
    session: state.session,
    error: state.error,
    signIn,
    signOut,
    signInWithProvider,
    verifyMFA
  };
};
var useUser = () => {
  const { user, isSignedIn, isLoaded } = useAuth();
  return { user, isSignedIn, isLoaded };
};
var useGoogleAuth = () => {
  const client = useAuthClient();
  const [token, setToken] = (0, import_react2.useState)(null);
  const login = (0, import_react2.useCallback)(() => client.signInWithProvider("google"), [client]);
  const signup = (0, import_react2.useCallback)(() => client.signInWithProvider("google"), [client]);
  (0, import_react2.useEffect)(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    if (urlToken) {
      setToken(urlToken);
      client.verifyMagicLink(urlToken).catch(console.error);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [client]);
  return { login, signup, token };
};

// src/components/SignIn.tsx
var import_react3 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var SignIn = () => {
  const { signIn, signInWithProvider, error, isLoaded, isAwaitingVerification } = useAuth();
  const [email, setEmail] = (0, import_react3.useState)("");
  const [loading, setLoading] = (0, import_react3.useState)(false);
  if (!isLoaded) return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: "Loading..." });
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  if (isAwaitingVerification) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "authify-card", style: { textAlign: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "48px", marginBottom: "16px" }, children: "\u2709\uFE0F" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "authify-title", children: "Check your email" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { style: { color: "#666", marginBottom: "24px", lineHeight: "1.5" }, children: [
        "We've sent a magic link to ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: email }),
        ".",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("br", {}),
        "Click the link in the email to sign in."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "authify-divider" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          onClick: () => window.location.reload(),
          className: "authify-btn authify-btn-secondary",
          children: "Back to Sign In"
        }
      )
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "authify-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "authify-title", children: "Sign In" }),
    error && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "authify-error", children: error }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("form", { onSubmit: handleEmailLogin, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "authify-input-group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "authify-label", children: "Email" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "input",
          {
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "authify-input",
            required: true,
            placeholder: "you@example.com"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "authify-btn authify-btn-primary",
          children: loading ? "Sending Magic Link..." : "Continue with Email"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "authify-divider", children: "or" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "authify-social-stack", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          onClick: () => signInWithProvider("google"),
          className: "authify-btn authify-btn-secondary",
          children: "Sign in with Google"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          onClick: () => signInWithProvider("github"),
          className: "authify-btn authify-btn-primary",
          style: { background: "#333", border: "1px solid #333" },
          children: "Sign in with GitHub"
        }
      )
    ] })
  ] });
};

// src/components/UserButton.tsx
var import_react4 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var UserButton = () => {
  const { user, signOut, isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = (0, import_react4.useState)(false);
  const menuRef = (0, import_react4.useRef)(null);
  (0, import_react4.useEffect)(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  if (!isSignedIn || !user) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "authify-user-button-container", style: { position: "relative", display: "inline-block" }, ref: menuRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "authify-user-button-trigger",
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "img",
          {
            src: user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name || "User"}`,
            alt: "Profile",
            className: "authify-avatar"
          }
        )
      }
    ),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "authify-dropdown", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "authify-dropdown-header", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "authify-dropdown-name", children: user.name || "User" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "authify-dropdown-email", children: user.email })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: "authify-dropdown-item", children: "Manage Account" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          onClick: () => signOut(),
          className: "authify-dropdown-item authify-dropdown-item-danger",
          children: "Sign Out"
        }
      )
    ] })
  ] });
};

// src/components/Protected.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var Protected = ({ children, fallback }) => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: fallback || null });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children });
};

// src/components/UserProfile.tsx
var import_react5 = require("react");
var import_styles = require("@authify/core/styles.css");
var import_jsx_runtime5 = require("react/jsx-runtime");
var UserProfile = () => {
  const { user, signOut, isLoaded, isSignedIn } = useAuth();
  const [editing, setEditing] = (0, import_react5.useState)(false);
  if (!isLoaded || !isSignedIn || !user) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "authify-card", style: { maxWidth: "400px" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "authify-profile-info", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "img",
        {
          src: user.avatarUrl,
          alt: user.name,
          className: "authify-avatar-lg"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { className: "authify-title", style: { margin: 0, fontSize: "20px" }, children: user.name }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { color: "#888", fontSize: "14px" }, children: user.email })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "authify-input-group", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { className: "authify-label", children: "User ID" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "authify-monospace", children: user.id })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { marginTop: "24px", display: "flex", gap: "10px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "button",
        {
          className: "authify-btn authify-btn-secondary",
          onClick: () => setEditing(!editing),
          children: "Edit Profile"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "button",
        {
          className: "authify-btn authify-btn-primary",
          style: { backgroundColor: "#ef4444", color: "#fff" },
          onClick: () => signOut(),
          children: "Sign Out"
        }
      )
    ] })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthifyProvider,
  Protected,
  SignIn,
  UserButton,
  UserProfile,
  useAuth,
  useAuthClient,
  useAuthState,
  useGoogleAuth,
  useUser
});
