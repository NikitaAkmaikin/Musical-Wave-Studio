import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: './',  // Добавляем этот параметр для корректной работы на сервере
  plugins: [react()],
  server: {
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // или "modern"
      },
    },
  },
});
