import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub 项目页可设环境变量 VITE_BASE=/仓库名/；用户页 username.github.io 用默认 /
const base = process.env.VITE_BASE ?? '/';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
});
