import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@client": fileURLToPath(new URL("./src", import.meta.url)),
      "@core": fileURLToPath(new URL("../core/src", import.meta.url)),
      "@rpg/core": fileURLToPath(
        new URL("../core/src/index.ts", import.meta.url)
      ),
    },
  },
});
