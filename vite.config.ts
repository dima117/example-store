/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': '/src/client',
            '@common': '/src/common',
            '@components': '/src/client/components',
        },
    },
    test: {
        environment: 'jsdom',
    },
});
