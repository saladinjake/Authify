import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        vue(),
        dts({
            insertTypesEntry: true,
            rollupTypes: true
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'AuthifyVue',
            fileName: 'authify-vue'
        },
        rollupOptions: {
            external: ['vue', '@authify/core'],
            output: {
                globals: {
                    vue: 'Vue',
                    '@authify/core': 'AuthifyCore'
                }
            }
        }
    }
});
