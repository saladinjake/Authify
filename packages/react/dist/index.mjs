// src/context.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { createAuthify } from "@authify/core";
import { jsx } from "react/jsx-runtime";
var AuthContext = createContext(null);
var AuthStateContext = createContext(null);
var AuthifyProvider = ({ children, client, config }) => {
  const [authClient] = useState(() => {
    if (client) return client;
    if (config) return createAuthify(config);
    throw new Error("AuthifyProvider requires either client or config.");
  });
  const [state, setState] = useState(authClient.state);
  useEffect(() => {
    const unsubscribe = authClient.subscribe((newState) => {
      setState(newState);
    });
    return () => unsubscribe();
  }, [authClient]);
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: authClient, children: /* @__PURE__ */ jsx(AuthStateContext.Provider, { value: state, children }) });
};
var useAuthClient = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthClient must be used within an AuthifyProvider");
  }
  return context;
};
var useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within an AuthifyProvider");
  }
  return context;
};

// src/hooks.ts
import { useCallback } from "react";
var useAuth = () => {
  const client = useAuthClient();
  const state = useAuthState();
  const signIn = useCallback((credentials) => {
    if (typeof credentials === "string") {
      return client.signInWithEmail(credentials);
    }
    return client.signIn(credentials);
  }, [client]);
  const signUp = useCallback((data) => client.signUp(data), [client]);
  const signOut = useCallback(() => client.signOut(), [client]);
  const signInWithProvider = useCallback((provider) => client.signInWithProvider(provider), [client]);
  const verifyMFA = useCallback((code) => client.verifyMFA(code), [client]);
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
    signUp,
    signOut,
    signInWithProvider,
    verifyMFA
  };
};
var useUser = () => {
  const { user, isSignedIn, isLoaded } = useAuth();
  return { user, isSignedIn, isLoaded };
};

// src/components/SignIn.tsx
import { useState as useState2 } from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var SignIn = () => {
  const { signIn, signUp, signInWithProvider, error, isLoaded, isAwaitingVerification, isMFAChallenge, verifyMFA } = useAuth();
  const [mode, setMode] = useState2("signin");
  const [email, setEmail] = useState2("");
  const [password, setPassword] = useState2("");
  const [name, setName] = useState2("");
  const [mfaCode, setMfaCode] = useState2("");
  const [loading, setLoading] = useState2(false);
  if (!isLoaded) return /* @__PURE__ */ jsx2("div", { children: "Loading..." });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
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
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleMFASubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyMFA(mfaCode);
    } catch (err) {
      console.error("MFA error:", err);
    } finally {
      setLoading(false);
    }
  };
  if (isMFAChallenge) {
    return /* @__PURE__ */ jsxs("div", { className: "authify-card", style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: "48px", marginBottom: "16px" }, children: "\u{1F510}" }),
      /* @__PURE__ */ jsx2("h2", { className: "authify-title", children: "Two-Factor Authentication" }),
      /* @__PURE__ */ jsx2("p", { style: { color: "#666", marginBottom: "24px", lineHeight: "1.5" }, children: "Enter the 6-digit code from your authenticator app" }),
      error && /* @__PURE__ */ jsx2("div", { className: "authify-error", children: error }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleMFASubmit, children: [
        /* @__PURE__ */ jsx2("div", { className: "authify-input-group", children: /* @__PURE__ */ jsx2(
          "input",
          {
            type: "text",
            value: mfaCode,
            onChange: (e) => setMfaCode(e.target.value),
            className: "authify-input",
            required: true,
            placeholder: "000000",
            maxLength: 6,
            pattern: "[0-9]{6}"
          }
        ) }),
        /* @__PURE__ */ jsx2(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "authify-btn authify-btn-primary",
            children: loading ? "Verifying..." : "Verify Code"
          }
        )
      ] })
    ] });
  }
  if (isAwaitingVerification) {
    return /* @__PURE__ */ jsxs("div", { className: "authify-card", style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: "48px", marginBottom: "16px" }, children: "\u2709\uFE0F" }),
      /* @__PURE__ */ jsx2("h2", { className: "authify-title", children: "Check your email" }),
      /* @__PURE__ */ jsxs("p", { style: { color: "#666", marginBottom: "24px", lineHeight: "1.5" }, children: [
        "We've sent a magic link to ",
        /* @__PURE__ */ jsx2("strong", { children: email }),
        ".",
        /* @__PURE__ */ jsx2("br", {}),
        "Click the link in the email to sign in."
      ] }),
      /* @__PURE__ */ jsx2("div", { className: "authify-divider" }),
      /* @__PURE__ */ jsx2(
        "button",
        {
          onClick: () => window.location.reload(),
          className: "authify-btn authify-btn-secondary",
          children: "Back to Sign In"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "authify-card", children: [
    /* @__PURE__ */ jsx2("h2", { className: "authify-title", children: mode === "signin" ? "Sign In" : "Sign Up" }),
    error && /* @__PURE__ */ jsx2("div", { className: "authify-error", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      mode === "signup" && /* @__PURE__ */ jsxs("div", { className: "authify-input-group", children: [
        /* @__PURE__ */ jsx2("label", { className: "authify-label", children: "Name" }),
        /* @__PURE__ */ jsx2(
          "input",
          {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "authify-input",
            required: true,
            placeholder: "John Doe"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "authify-input-group", children: [
        /* @__PURE__ */ jsx2("label", { className: "authify-label", children: "Email" }),
        /* @__PURE__ */ jsx2(
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
      /* @__PURE__ */ jsxs("div", { className: "authify-input-group", children: [
        /* @__PURE__ */ jsx2("label", { className: "authify-label", children: "Password (optional)" }),
        /* @__PURE__ */ jsx2(
          "input",
          {
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: "authify-input",
            placeholder: "Leave blank for magic link"
          }
        )
      ] }),
      /* @__PURE__ */ jsx2(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "authify-btn authify-btn-primary",
          children: loading ? "Processing..." : password ? mode === "signin" ? "Sign In" : "Sign Up" : "Continue with Email"
        }
      )
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "authify-divider", children: "or" }),
    /* @__PURE__ */ jsxs("div", { className: "authify-social-stack", children: [
      /* @__PURE__ */ jsx2(
        "button",
        {
          onClick: () => signInWithProvider("google"),
          className: "authify-btn authify-btn-secondary",
          children: "Sign in with Google"
        }
      ),
      /* @__PURE__ */ jsx2(
        "button",
        {
          onClick: () => signInWithProvider("github"),
          className: "authify-btn authify-btn-primary",
          style: { background: "#333", border: "1px solid #333" },
          children: "Sign in with GitHub"
        }
      )
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: "16px", textAlign: "center" }, children: /* @__PURE__ */ jsx2(
      "button",
      {
        onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
        className: "authify-btn authify-btn-secondary",
        style: { background: "transparent", border: "none", color: "#666", textDecoration: "underline" },
        children: mode === "signin" ? "Don't have an account? Sign up" : "Already have an account? Sign in"
      }
    ) })
  ] });
};

// src/components/UserButton.tsx
import { useState as useState3, useRef, useEffect as useEffect2 } from "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var UserButton = () => {
  const { user, signOut, isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState3(false);
  const menuRef = useRef(null);
  useEffect2(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  if (!isSignedIn || !user) return null;
  return /* @__PURE__ */ jsxs2("div", { className: "authify-user-button-container", style: { position: "relative", display: "inline-block" }, ref: menuRef, children: [
    /* @__PURE__ */ jsx3(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "authify-user-button-trigger",
        children: /* @__PURE__ */ jsx3(
          "img",
          {
            src: user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name || "User"}`,
            alt: "Profile",
            className: "authify-avatar"
          }
        )
      }
    ),
    isOpen && /* @__PURE__ */ jsxs2("div", { className: "authify-dropdown", children: [
      /* @__PURE__ */ jsxs2("div", { className: "authify-dropdown-header", children: [
        /* @__PURE__ */ jsx3("div", { className: "authify-dropdown-name", children: user.name || "User" }),
        /* @__PURE__ */ jsx3("div", { className: "authify-dropdown-email", children: user.email })
      ] }),
      /* @__PURE__ */ jsx3("button", { className: "authify-dropdown-item", children: "Manage Account" }),
      /* @__PURE__ */ jsx3(
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
import { Fragment, jsx as jsx4 } from "react/jsx-runtime";
var Protected = ({ children, fallback }) => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return /* @__PURE__ */ jsx4(Fragment, { children: fallback || null });
  }
  return /* @__PURE__ */ jsx4(Fragment, { children });
};

// src/components/UserProfile.tsx
import { useState as useState4 } from "react";
import "@authify/core/styles.css";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var UserProfile = () => {
  const { user, signOut, isLoaded, isSignedIn } = useAuth();
  const [editing, setEditing] = useState4(false);
  if (!isLoaded || !isSignedIn || !user) return null;
  return /* @__PURE__ */ jsxs3("div", { className: "authify-card", style: { maxWidth: "400px" }, children: [
    /* @__PURE__ */ jsxs3("div", { className: "authify-profile-info", children: [
      /* @__PURE__ */ jsx5(
        "img",
        {
          src: user.avatarUrl,
          alt: user.name,
          className: "authify-avatar-lg"
        }
      ),
      /* @__PURE__ */ jsxs3("div", { children: [
        /* @__PURE__ */ jsx5("h2", { className: "authify-title", style: { margin: 0, fontSize: "20px" }, children: user.name }),
        /* @__PURE__ */ jsx5("div", { style: { color: "#888", fontSize: "14px" }, children: user.email })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "authify-input-group", children: [
      /* @__PURE__ */ jsx5("label", { className: "authify-label", children: "User ID" }),
      /* @__PURE__ */ jsx5("div", { className: "authify-monospace", children: user.id })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { marginTop: "24px", display: "flex", gap: "10px" }, children: [
      /* @__PURE__ */ jsx5(
        "button",
        {
          className: "authify-btn authify-btn-secondary",
          onClick: () => setEditing(!editing),
          children: "Edit Profile"
        }
      ),
      /* @__PURE__ */ jsx5(
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
export {
  AuthifyProvider,
  Protected,
  SignIn,
  UserButton,
  UserProfile,
  useAuth,
  useAuthClient,
  useAuthState,
  useUser
};
