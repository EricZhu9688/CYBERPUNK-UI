import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, "."),
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "../src/styles/variables.less";`,
      },
    },
  },
  server: {
    port: 3001,
    open: true,
  },
  build: {
    outDir: resolve(__dirname, "../dist-site"),
  },
});