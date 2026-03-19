<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuth } from '../composables';
import ForgotPassword from './ForgotPassword.vue';
import ResetPassword from './ResetPassword.vue';

const { signIn, signInWithProvider, error, status } = useAuth();
const email = ref('');
const password = ref('');
const loading = ref(false);
const view = ref<'signin' | 'forgot' | 'reset'>('signin');
const resetEmail = ref('');

const isAwaitingVerification = computed(() => status.value === 'awaiting_verification');

async function handleLogin() {
  loading.value = true;
  try {
    await signIn({ email: email.value, password: password.value });
  } finally {
    loading.value = false;
  }
}

const handleSent = (mail: string) => {
  resetEmail.value = mail;
  view.value = 'reset';
};

const reload = () => window.location.reload();
</script>

<template>
  <ForgotPassword 
    v-if="view === 'forgot'" 
    @back="view = 'signin'" 
    @sent="handleSent" 
  />

  <ResetPassword 
    v-else-if="view === 'reset'" 
    :email="resetEmail" 
    @back="view = 'signin'" 
    @success="view = 'signin'" 
  />

  <div v-else-if="isAwaitingVerification" class="authify-card" style="text-align: center;">
    <div style="font-size: 48px; margin-bottom: 16px;">✉️</div>
    <h2 class="authify-title">Check your email</h2>
    <p style="color: #666; margin-bottom: 24px; line-height: 1.5;">
      We've sent a magic link to <strong>{{ email }}</strong>.<br />
      Click the link in the email to sign in.
    </p>
    <div class="authify-divider"></div>
    <button 
      @click="reload" 
      class="authify-btn authify-btn-secondary"
    >
      Back to Sign In
    </button>
  </div>

  <div v-else class="authify-card">
    <h2 class="authify-title">Sign In</h2>
    <div v-if="error" class="authify-error">{{ error }}</div>
    
    <form @submit.prevent="handleLogin">
      <div class="authify-input-group">
        <label class="authify-label">Email</label>
        <input
          type="email"
          v-model="email"
          class="authify-input"
          required
          placeholder="you@example.com"
        />
      </div>
      <div class="authify-input-group">
        <div style="display: flex; justify-content: space-between">
          <label class="authify-label">Password</label>
          <button 
            type="button" 
            @click="view = 'forgot'"
            style="background: none; border: none; padding: 0; color: var(--authify-primary-color); font-size: 12px; cursor: pointer"
          >
            Forgot password?
          </button>
        </div>
        <input
          type="password"
          v-model="password"
          class="authify-input"
          placeholder="••••••••"
        />
      </div>
      <button 
        type="submit" 
        :disabled="loading"
        class="authify-btn authify-btn-primary"
      >
        {{ loading ? 'Signing in...' : (password ? 'Sign In' : 'Continue with Email') }}
      </button>
    </form>

    <div class="authify-divider">or</div>

    <div class="authify-social-stack">
      <button 
        @click="signInWithProvider('google')"
        class="authify-btn authify-btn-secondary"
      >
        Sign in with Google
      </button>
      <button 
        @click="signInWithProvider('github')"
        class="authify-btn authify-btn-primary" 
        style="background: #333; border: 1px solid #333;"
      >
        Sign in with GitHub
      </button>
    </div>
  </div>
</template>
