import { reactive as A, readonly as U, inject as x, computed as f, ref as g, onMounted as I, defineComponent as S, openBlock as y, createElementBlock as h, createElementVNode as t, createTextVNode as k, toDisplayString as c, unref as o, createCommentVNode as p, withModifiers as E, withDirectives as O, vModelText as L, onUnmounted as M } from "vue";
import { createAuthify as W } from "@authify/core";
const $ = Symbol("AuthClient"), C = Symbol("AuthState"), st = {
  install(e, n) {
    let s;
    "client" in n ? s = n.client : s = W(n.config);
    const l = A(s.state);
    s.subscribe((r) => {
      Object.assign(l, r);
    }), e.provide($, s), e.provide(C, U(l));
  }
};
function P() {
  const e = x($);
  if (!e) throw new Error("AuthifyPlugin not installed");
  return e;
}
function B() {
  const e = x(C);
  if (!e) throw new Error("AuthifyPlugin not installed");
  return e;
}
function b() {
  const e = P(), n = B(), s = f(() => n.status !== "loading"), l = f(() => n.status === "authenticated");
  return {
    // State (Using computed to unwrap for easy usage, or just return state directly)
    state: n,
    isLoaded: s,
    isSignedIn: l,
    user: f(() => n.user),
    session: f(() => n.session),
    error: f(() => n.error),
    status: f(() => n.status),
    // Actions
    signIn: e.signInWithEmail.bind(e),
    signOut: e.signOut.bind(e),
    signInWithProvider: e.signInWithProvider.bind(e)
  };
}
function ot() {
  const { user: e, isSignedIn: n, isLoaded: s } = b();
  return { user: e, isSignedIn: n, isLoaded: s };
}
function at() {
  const e = P(), n = g(null), s = () => e.signInWithProvider("google"), l = () => e.signInWithProvider("google");
  return I(() => {
    if (typeof window > "u") return;
    const a = new URLSearchParams(window.location.search).get("token");
    a && (n.value = a, e.verifyMagicLink(a).catch(console.error), window.history.replaceState({}, document.title, window.location.pathname));
  }), { login: s, signup: l, token: n };
}
const V = {
  key: 0,
  class: "authify-card",
  style: { "text-align": "center" }
}, z = { style: { color: "#666", "margin-bottom": "24px", "line-height": "1.5" } }, D = {
  key: 1,
  class: "authify-card"
}, G = {
  key: 0,
  class: "authify-error"
}, N = { class: "authify-input-group" }, R = ["disabled"], T = { class: "authify-social-stack" }, lt = /* @__PURE__ */ S({
  __name: "SignIn",
  setup(e) {
    const { signIn: n, signInWithProvider: s, error: l, status: r } = b(), a = g(""), u = g(!1), d = f(() => r.value === "awaiting_verification");
    async function w(v) {
      u.value = !0;
      try {
        await n(a.value);
      } finally {
        u.value = !1;
      }
    }
    const m = () => window.location.reload();
    return (v, i) => d.value ? (y(), h("div", V, [
      i[7] || (i[7] = t("div", { style: { "font-size": "48px", "margin-bottom": "16px" } }, "✉️", -1)),
      i[8] || (i[8] = t("h2", { class: "authify-title" }, "Check your email", -1)),
      t("p", z, [
        i[3] || (i[3] = k(" We've sent a magic link to ", -1)),
        t("strong", null, c(a.value), 1),
        i[4] || (i[4] = k(".", -1)),
        i[5] || (i[5] = t("br", null, null, -1)),
        i[6] || (i[6] = k(" Click the link in the email to sign in. ", -1))
      ]),
      i[9] || (i[9] = t("div", { class: "authify-divider" }, null, -1)),
      t("button", {
        onClick: m,
        class: "authify-btn authify-btn-secondary"
      }, " Back to Sign In ")
    ])) : (y(), h("div", D, [
      i[11] || (i[11] = t("h2", { class: "authify-title" }, "Sign In", -1)),
      o(l) ? (y(), h("div", G, c(o(l)), 1)) : p("", !0),
      t("form", {
        onSubmit: E(w, ["prevent"])
      }, [
        t("div", N, [
          i[10] || (i[10] = t("label", { class: "authify-label" }, "Email", -1)),
          O(t("input", {
            type: "email",
            "onUpdate:modelValue": i[0] || (i[0] = (_) => a.value = _),
            class: "authify-input",
            required: "",
            placeholder: "you@example.com"
          }, null, 512), [
            [L, a.value]
          ])
        ]),
        t("button", {
          type: "submit",
          disabled: u.value,
          class: "authify-btn authify-btn-primary"
        }, c(u.value ? "Sending Magic Link..." : "Continue with Email"), 9, R)
      ], 32),
      i[12] || (i[12] = t("div", { class: "authify-divider" }, "or", -1)),
      t("div", T, [
        t("button", {
          onClick: i[1] || (i[1] = (_) => o(s)("google")),
          class: "authify-btn authify-btn-secondary"
        }, " Sign in with Google "),
        t("button", {
          onClick: i[2] || (i[2] = (_) => o(s)("github")),
          class: "authify-btn authify-btn-primary",
          style: { background: "#333", border: "1px solid #333" }
        }, " Sign in with GitHub ")
      ])
    ]));
  }
}), j = ["src"], K = {
  key: 0,
  class: "authify-dropdown"
}, q = { class: "authify-dropdown-header" }, H = { class: "authify-dropdown-name" }, F = { class: "authify-dropdown-email" }, rt = /* @__PURE__ */ S({
  __name: "UserButton",
  setup(e) {
    const { user: n, signOut: s, isSignedIn: l } = b(), r = g(!1), a = g(null), u = (m) => {
      a.value && !a.value.contains(m.target) && (r.value = !1);
    };
    I(() => {
      document.addEventListener("mousedown", u);
    }), M(() => {
      document.removeEventListener("mousedown", u);
    });
    const d = () => {
      r.value = !r.value;
    }, w = () => {
      s(), r.value = !1;
    };
    return (m, v) => o(l) && o(n) ? (y(), h("div", {
      key: 0,
      class: "authify-user-button-container",
      ref_key: "menuRef",
      ref: a,
      style: { position: "relative", display: "inline-block" }
    }, [
      t("button", {
        onClick: d,
        class: "authify-user-button-trigger"
      }, [
        t("img", {
          src: o(n).avatarUrl || `https://ui-avatars.com/api/?name=${o(n).name || "User"}`,
          alt: "Profile",
          class: "authify-avatar"
        }, null, 8, j)
      ]),
      r.value ? (y(), h("div", K, [
        t("div", q, [
          t("div", H, c(o(n).name || "User"), 1),
          t("div", F, c(o(n).email), 1)
        ]),
        v[0] || (v[0] = t("button", { class: "authify-dropdown-item" }, "Manage Account", -1)),
        t("button", {
          onClick: w,
          class: "authify-dropdown-item authify-dropdown-item-danger"
        }, " Sign Out ")
      ])) : p("", !0)
    ], 512)) : p("", !0);
  }
}), J = {
  key: 0,
  class: "authify-card",
  style: { "max-width": "400px" }
}, Q = { class: "authify-profile-info" }, X = ["src", "alt"], Y = {
  class: "authify-title",
  style: { margin: "0", "font-size": "20px" }
}, Z = { style: { color: "#888", "font-size": "14px" } }, tt = { class: "authify-input-group" }, nt = { class: "authify-monospace" }, ut = /* @__PURE__ */ S({
  __name: "UserProfile",
  setup(e) {
    const { user: n, signOut: s, isLoaded: l, isSignedIn: r } = b(), a = () => {
      s();
    };
    return (u, d) => o(l) && o(r) && o(n) ? (y(), h("div", J, [
      t("div", Q, [
        t("img", {
          src: o(n).avatarUrl,
          alt: o(n).name,
          class: "authify-avatar-lg"
        }, null, 8, X),
        t("div", null, [
          t("h2", Y, c(o(n).name), 1),
          t("div", Z, c(o(n).email), 1)
        ])
      ]),
      t("div", tt, [
        d[0] || (d[0] = t("label", { class: "authify-label" }, "User ID", -1)),
        t("div", nt, c(o(n).id), 1)
      ]),
      t("div", { style: { "margin-top": "24px", display: "flex", gap: "10px" } }, [
        d[1] || (d[1] = t("button", { class: "authify-btn authify-btn-secondary" }, " Edit Profile ", -1)),
        t("button", {
          onClick: a,
          class: "authify-btn authify-btn-primary",
          style: { "background-color": "#ef4444", color: "white" }
        }, " Sign Out ")
      ])
    ])) : p("", !0);
  }
});
export {
  $ as AuthClientKey,
  C as AuthStateKey,
  st as AuthifyPlugin,
  lt as SignIn,
  rt as UserButton,
  ut as UserProfile,
  b as useAuth,
  P as useAuthClient,
  B as useAuthState,
  at as useGoogleAuth,
  ot as useUser
};
