<script setup lang="ts">
import { ref } from 'vue'
import { SignIn, UserButton, useUser } from '@authify/vue'
import Dashboard from './components/Dashboard.vue'
import '@authify/core/styles.css'

const { isSignedIn, isLoaded, user } = useUser()
const showDashboard = ref(false)
</script>

<template>
  <div class="auth-demo" :style="{ maxWidth: showDashboard ? '800px' : '400px' }">
    <div v-if="!isLoaded">Loading...</div>
    <div v-else>
      <h1>Authify Vue Demo</h1>
      <div v-if="isSignedIn">
        <div class="header-row">
          <div class="user-info">
             <h3>Welcome back, {{ user?.name || 'User' }}!</h3>
             <p>{{ user?.email }}</p>
          </div>
          <UserButton />
        </div>

        <div v-if="user?.role === 'admin'" class="admin-actions">
           <button @click="showDashboard = !showDashboard" class="console-btn">
             {{ showDashboard ? 'Hide Console' : 'Open Admin Console' }}
           </button>
        </div>

        <Dashboard v-if="showDashboard" />
        <div v-else class="profile-summary">
           <pre>{{ JSON.stringify(user, null, 2) }}</pre>
        </div>
      </div>
      <div v-else>
        <SignIn />
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-demo {
  margin: 100px auto;
  padding: 40px;
  text-align: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.1);
  transition: max-width 0.3s ease;
}
.header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.user-info { text-align: left; }
.user-info h3 { margin: 0; }
.user-info p { margin: 0; font-size: 14px; color: #666; }
.admin-actions { margin-bottom: 20px; }
.console-btn { width: 100%; padding: 10px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; }
.profile-summary { text-align: left; background: #f8f8f8; padding: 15px; border-radius: 8px; font-size: 12px; }
h1 { margin-bottom: 30px; }
</style>

<style scoped>
.auth-demo {
  max-width: 400px;
  margin: 100px auto;
  padding: 40px;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}
h1 { margin-bottom: 30px; }
</style>
