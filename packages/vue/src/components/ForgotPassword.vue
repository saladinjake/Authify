<template>
  <div class="authify-card">
    <h2 class="authify-title">Forgot Password</h2>
    <p style="color: #666; margin-bottom: 24px">
      Enter your email and we'll send you a 6-digit reset code.
    </p>

    <div v-if="error" class="authify-error">{{ error }}</div>

    <form @submit.prevent="handleSubmit">
      <div class="authify-input-group">
        <label class="authify-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="authify-input"
          placeholder="you@example.com"
          required
        />
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="authify-btn authify-btn-primary"
      >
        {{ loading ? 'Sending Code...' : 'Send Reset Code' }}
      </button>
    </form>

    <button
      @click="$emit('back')"
      class="authify-btn authify-btn-secondary"
      style="margin-top: 12px"
    >
      Back to Sign In
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../composables';

const emit = defineEmits(['back', 'sent']);
const { forgotPassword, error } = useAuth();
const email = ref('');
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  try {
    await forgotPassword(email.value);
    emit('sent', email.value);
  } catch (err) {
    // Handled by store
  } finally {
    loading.value = false;
  }
};
</script>
