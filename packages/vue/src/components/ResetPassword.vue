<template>
  <div v-if="successMsg" class="authify-card" style="text-align: center">
    <div style="font-size: 48px; margin-bottom: 16px">✅</div>
    <h2 class="authify-title">Success!</h2>
    <p style="color: #059669; font-weight: 500">{{ successMsg }}</p>
    <p style="color: #666; margin-top: 12px">Redirecting to sign in...</p>
  </div>

  <div v-else class="authify-card">
    <div style="color: #059669; background-color: #ecfdf5; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; text-align: center">
      ✅ Reset code sent to your email!
    </div>
    <h2 class="authify-title">
      {{ step === 'verify' ? 'Verify Code' : 'New Password' }}
    </h2>
    <p style="color: #666; margin-bottom: 24px">
      {{
        step === 'verify'
          ? 'Enter the 6-digit code sent to ' + email
          : 'Enter your new password below.'
      }}
    </p>

    <div v-if="error" class="authify-error">{{ error }}</div>

    <div
      v-if="step === 'verify'"
      style="display: flex; gap: 8px; justify-content: center; margin-bottom: 24px"
    >
      <input
        v-for="(digit, idx) in code"
        :key="idx"
        :ref="el => (inputRefs[idx] = el as HTMLInputElement)"
        v-model="code[idx]"
        type="password"
        maxlength="1"
        class="authify-input"
        style="width: 45px; text-align: center; font-size: 20px"
        autocomplete="one-time-code"
        @input="handleInput(idx)"
        @keydown.delete="handleDelete(idx)"
      />
    </div>

    <form v-else @submit.prevent="handleReset">
      <div class="authify-input-group">
        <label class="authify-label">New Password</label>
        <input
          v-model="newPassword"
          type="password"
          class="authify-input"
          required
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="authify-btn authify-btn-primary"
      >
        {{ loading ? 'Resetting...' : 'Reset Password' }}
      </button>
    </form>

    <button
      @click="$emit('back')"
      class="authify-btn authify-btn-secondary"
      style="margin-top: 12px"
    >
      Cancel
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useAuth } from '../composables';

const props = defineProps<{ email: string }>();
const emit = defineEmits(['back', 'success']);

const { verifyResetCode, resetPassword, error } = useAuth();
const code = ref(['', '', '', '', '', '']);
const newPassword = ref('');
const step = ref<'verify' | 'reset'>('verify');
const loading = ref(false);
const successMsg = ref('');
const inputRefs = ref<HTMLInputElement[]>([]);

const handleInput = (idx: number) => {
  if (code.value[idx] && idx < 5) {
    inputRefs.value[idx + 1]?.focus();
  }
};

const handleDelete = (idx: number) => {
  if (!code.value[idx] && idx > 0) {
    inputRefs.value[idx - 1]?.focus();
  }
};

watch(code, (newVal) => {
  const fullCode = newVal.join('');
  if (fullCode.length === 6 && step.value === 'verify') {
    handleVerify(fullCode);
  }
}, { deep: true });

const handleVerify = async (fullCode: string) => {
  loading.value = true;
  try {
    await verifyResetCode(props.email, fullCode);
    step.value = 'reset';
  } catch (err) {
    // Handled by store
  } finally {
    loading.value = false;
  }
};

const handleReset = async () => {
  loading.value = true;
  try {
    await resetPassword(props.email, code.value.join(''), newPassword.value);
    successMsg.value = 'Your password has been reset successfully!';
    setTimeout(() => emit('success'), 3000);
  } catch (err) {
    // Handled by store
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  inputRefs.value[0]?.focus();
});
</script>
