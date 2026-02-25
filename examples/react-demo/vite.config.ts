import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        exclude: ['@authify/core', '@authify/react']
    },
    build: {
        commonjsOptions: {
            include: [/@authify/, /node_modules/]
        }
    }
})
