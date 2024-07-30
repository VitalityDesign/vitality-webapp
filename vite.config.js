import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    open: true,
    https: {
      cert: fs.readFileSync(path.join(__dirname, "src/ssl/cert.crt")),
      key: fs.readFileSync(path.join(__dirname, "src/ssl/cert.key")),
    },
  },
});
