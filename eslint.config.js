import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  { ignores: ["dist/", "node_modules/", "coverage/", "packages/*/dist/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  // Apply type-aware linting to the monorepo packages
  // Use explicit project instead of projectService for less overhead
  {
    files: ["packages/*/src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: [
          "packages/domain/tsconfig.json",
          "packages/game/tsconfig.json",
        ],
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
    rules: {
      // Rules aligned with tsconfig strict
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],
    },
  },
  {
    // Types files can export without local usage
    files: ["**/types.ts", "**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);
