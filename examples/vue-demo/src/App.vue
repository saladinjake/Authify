<script setup lang="ts">
import { SignIn, UserButton, useUser } from '@authify/vue'
import '@authify/core/styles.css'

const { isSignedIn, isLoaded } = useUser()
</script>

<template>
  <div class="auth-demo">
    <div v-if="!isLoaded">Loading...</div>
    <div v-else>
      <h1>Authify Vue Demo</h1>
      <div v-if="isSignedIn">
        <UserButton />
      </div>
      <div v-else>
        <SignIn />
      </div>
    </div>
  </div>
</template>

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
