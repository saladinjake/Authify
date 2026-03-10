import { reactive as I, readonly as A, inject as x, computed as f, defineComponent as S, ref as v, openBlock as y, createElementBlock as h, createElementVNode as t, createTextVNode as w, toDisplayString as c, unref as s, createCommentVNode as p, withModifiers as U, withDirectives as E, vModelText as O, onMounted as P, onUnmounted as L } from "vue";
import { createAuthify as M } from "@authify/core";
const $ = Symbol("AuthClient"), C = Symbol("AuthState"), st = {
  install(e, i) {
    let o;
    "client" in i ? o = i.client : o = M(i.config);
    const a = I(o.state);
    o.subscribe((l) => {
      Object.assign(a, l);
    }), e.provide($, o), e.provide(C, A(a));
  }
};
function B() {
  const e = x($);
  if (!e) throw new Error("AuthifyPlugin not installed");
  return e;
}
function V() {
  const e = x(C);
  if (!e) throw new Error("AuthifyPlugin not installed");
  return e;
}
function b() {
  const e = B(), i = V(), o = f(() => i.status !== "loading"), a = f(() => i.status === "authenticated");
  return {
    // State (Using computed to unwrap for easy usage, or just return state directly)
    state: i,
    isLoaded: o,
    isSignedIn: a,
    user: f(() => i.user),
    session: f(() => i.session),
    error: f(() => i.error),
    status: f(() => i.status),
    // Actions
    signIn: e.signInWithEmail.bind(e),
    signOut: e.signOut.bind(e),
    signInWithProvider: e.signInWithProvider.bind(e)
  };
}
function ot() {
  const { user: e, isSignedIn: i, isLoaded: o } = b();
  return { user: e, isSignedIn: i, isLoaded: o };
}
const W = {
  key: 0,
  class: "authify-card",
  style: { "text-align": "center" }
}, z = { style: { color: "#666", "margin-bottom": "24px", "line-height": "1.5" } }, D = {
  key: 1,
  class: "authify-card"
}, N = {
  key: 0,
  class: "authify-error"
}, j = { class: "authify-input-group" }, G = ["disabled"], K = { class: "authify-social-stack" }, at = /* @__PURE__ */ S({
  __name: "SignIn",
  setup(e) {
    const { signIn: i, signInWithProvider: o, error: a, status: l } = b(), u = v(""), r = v(!1), d = f(() => l.value === "awaiting_verification");
    async function _(g) {
      r.value = !0;
      try {
        await i(u.value);
      } finally {
        r.value = !1;
      }
    }
    const m = () => window.location.reload();
    return (g, n) => d.value ? (y(), h("div", W, [
      n[7] || (n[7] = t("div", { style: { "font-size": "48px", "margin-bottom": "16px" } }, "✉️", -1)),
      n[8] || (n[8] = t("h2", { class: "authify-title" }, "Check your email", -1)),
      t("p", z, [
        n[3] || (n[3] = w(" We've sent a magic link to ", -1)),
        t("strong", null, c(u.value), 1),
        n[4] || (n[4] = w(".", -1)),
        n[5] || (n[5] = t("br", null, null, -1)),
        n[6] || (n[6] = w(" Click the link in the email to sign in. ", -1))
      ]),
      n[9] || (n[9] = t("div", { class: "authify-divider" }, null, -1)),
      t("button", {
        onClick: m,
        class: "authify-btn authify-btn-secondary"
      }, " Back to Sign In ")
    ])) : (y(), h("div", D, [
      n[11] || (n[11] = t("h2", { class: "authify-title" }, "Sign In", -1)),
      s(a) ? (y(), h("div", N, c(s(a)), 1)) : p("", !0),
      t("form", {
        onSubmit: U(_, ["prevent"])
      }, [
        t("div", j, [
          n[10] || (n[10] = t("label", { class: "authify-label" }, "Email", -1)),
          E(t("input", {
            type: "email",
            "onUpdate:modelValue": n[0] || (n[0] = (k) => u.value = k),
            class: "authify-input",
            required: "",
            placeholder: "you@example.com"
          }, null, 512), [
            [O, u.value]
          ])
        ]),
        t("button", {
          type: "submit",
          disabled: r.value,
          class: "authify-btn authify-btn-primary"
        }, c(r.value ? "Sending Magic Link..." : "Continue with Email"), 9, G)
      ], 32),
      n[12] || (n[12] = t("div", { class: "authify-divider" }, "or", -1)),
      t("div", K, [
        t("button", {
          onClick: n[1] || (n[1] = (k) => s(o)("google")),
          class: "authify-btn authify-btn-secondary"
        }, " Sign in with Google "),
        t("button", {
          onClick: n[2] || (n[2] = (k) => s(o)("github")),
          class: "authify-btn authify-btn-primary",
          style: { background: "#333", border: "1px solid #333" }
        }, " Sign in with GitHub ")
      ])
    ]));
  }
}), R = ["src"], T = {
  key: 0,
  class: "authify-dropdown"
}, q = { class: "authify-dropdown-header" }, H = { class: "authify-dropdown-name" }, F = { class: "authify-dropdown-email" }, lt = /* @__PURE__ */ S({
  __name: "UserButton",
  setup(e) {
    const { user: i, signOut: o, isSignedIn: a } = b(), l = v(!1), u = v(null), r = (m) => {
      u.value && !u.value.contains(m.target) && (l.value = !1);
    };
    P(() => {
      document.addEventListener("mousedown", r);
    }), L(() => {
      document.removeEventListener("mousedown", r);
    });
    const d = () => {
      l.value = !l.value;
    }, _ = () => {
      o(), l.value = !1;
    };
    return (m, g) => s(a) && s(i) ? (y(), h("div", {
      key: 0,
      class: "authify-user-button-container",
      ref_key: "menuRef",
      ref: u,
      style: { position: "relative", display: "inline-block" }
    }, [
      t("button", {
        onClick: d,
        class: "authify-user-button-trigger"
      }, [
        t("img", {
          src: s(i).avatarUrl || `https://ui-avatars.com/api/?name=${s(i).name || "User"}`,
          alt: "Profile",
          class: "authify-avatar"
        }, null, 8, R)
      ]),
      l.value ? (y(), h("div", T, [
        t("div", q, [
          t("div", H, c(s(i).name || "User"), 1),
          t("div", F, c(s(i).email), 1)
        ]),
        g[0] || (g[0] = t("button", { class: "authify-dropdown-item" }, "Manage Account", -1)),
        t("button", {
          onClick: _,
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
}, Z = { style: { color: "#888", "font-size": "14px" } }, tt = { class: "authify-input-group" }, it = { class: "authify-monospace" }, ut = /* @__PURE__ */ S({
  __name: "UserProfile",
  setup(e) {
    const { user: i, signOut: o, isLoaded: a, isSignedIn: l } = b(), u = () => {
      o();
    };
    return (r, d) => s(a) && s(l) && s(i) ? (y(), h("div", J, [
      t("div", Q, [
        t("img", {
          src: s(i).avatarUrl,
          alt: s(i).name,
          class: "authify-avatar-lg"
        }, null, 8, X),
        t("div", null, [
          t("h2", Y, c(s(i).name), 1),
          t("div", Z, c(s(i).email), 1)
        ])
      ]),
      t("div", tt, [
        d[0] || (d[0] = t("label", { class: "authify-label" }, "User ID", -1)),
        t("div", it, c(s(i).id), 1)
      ]),
      t("div", { style: { "margin-top": "24px", display: "flex", gap: "10px" } }, [
        d[1] || (d[1] = t("button", { class: "authify-btn authify-btn-secondary" }, " Edit Profile ", -1)),
        t("button", {
          onClick: u,
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
  at as SignIn,
  lt as UserButton,
  ut as UserProfile,
  b as useAuth,
  B as useAuthClient,
  V as useAuthState,
  ot as useUser
};
