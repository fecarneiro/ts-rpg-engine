import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@game": resolve(__dirname, "src"),
      "@domain": resolve(__dirname, "../domain/src"),
    },
  },
});
