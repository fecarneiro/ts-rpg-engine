import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@client": fileURLToPath(new URL("./src", import.meta.url)),
      "@rpg/core": fileURLToPath(new URL("../core/src/index.ts", import.meta.url)),
    },
  },
});
