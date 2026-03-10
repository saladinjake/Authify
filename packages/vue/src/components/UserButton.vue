<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuth } from '../composables';

const { user, signOut, isSignedIn } = useAuth();
const isOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleSignOut = () => {
  signOut();
  isOpen.value = false;
};
</script>

<template>
  <div v-if="isSignedIn && user" class="authify-user-button-container" ref="menuRef" style="position: relative; display: inline-block;">
    <button @click="toggleMenu" class="authify-user-button-trigger">
      <img
        :src="user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name || 'User'}`"
        alt="Profile"
        class="authify-avatar"
      />
    </button>

    <div v-if="isOpen" class="authify-dropdown">
      <div class="authify-dropdown-header">
        <div class="authify-dropdown-name">{{ user.name || 'User' }}</div>
        <div class="authify-dropdown-email">{{ user.email }}</div>
      </div>
      
      <button class="authify-dropdown-item">Manage Account</button>
      
      <button 
        @click="handleSignOut" 
        class="authify-dropdown-item authify-dropdown-item-danger"
      >
        Sign Out
      </button>
    </div>
  </div>
</template>
