import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },
});
