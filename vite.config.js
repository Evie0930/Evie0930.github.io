import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // GitHub 项目页可设环境变量 VITE_BASE=/仓库名/；用户页 username.github.io 用默认 /
  const base = env.VITE_BASE ?? '/';
  const apiProxyTarget = env.VITE_API_PROXY_TARGET ?? env.VITE_API_URL ?? 'http://localhost:3000';

  return {
    plugins: [react(), tailwindcss()],
    base,
    server: {
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
