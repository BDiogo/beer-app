import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const defaultConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
    optimizeDeps: {
      include: ["@mui/material"],
    },
  },
};

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  return {
    ...defaultConfig,
    server: {
      port: 4000,
      cors: true,
      proxy: {
        "/api": {
          target: isDev ? "http://127.0.0.1:3000" : "URL_PROD",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace("/api/", "/"),
        },
      },
    },
  };
});
