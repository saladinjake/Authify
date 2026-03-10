<script setup lang="ts">
import { useAuth } from '../composables';

const { user, signOut, isLoaded, isSignedIn } = useAuth();

const handleSignOut = () => {
  signOut();
};
</script>

<template>
  <div v-if="isLoaded && isSignedIn && user" class="authify-card" style="max-width: 400px;">
    <div class="authify-profile-info">
      <img
        :src="user.avatarUrl"
        :alt="user.name"
        class="authify-avatar-lg"
      />
      <div>
        <h2 class="authify-title" style="margin: 0; font-size: 20px;">{{ user.name }}</h2>
        <div style="color: #888; font-size: 14px;">{{ user.email }}</div>
      </div>
    </div>

    <div class="authify-input-group">
      <label class="authify-label">User ID</label>
      <div class="authify-monospace">
        {{ user.id }}
      </div>
    </div>

    <div style="margin-top: 24px; display: flex; gap: 10px;">
      <button class="authify-btn authify-btn-secondary">
        Edit Profile
      </button>
      <button
        @click="handleSignOut"
        class="authify-btn authify-btn-primary"
        style="background-color: #ef4444; color: white;"
      >
        Sign Out
      </button>
    </div>
  </div>
</template>
