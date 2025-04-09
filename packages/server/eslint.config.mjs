import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node,
    }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"]
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      // Error prevention
      "no-unused-vars": "off",
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-return-await": "error",
      "no-promise-executor-return": "error",
      "no-param-reassign": "error",
      "no-throw-literal": "error",

      // TypeScript specific
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_", 
        "varsIgnorePattern": "^_", 
        "ignoreRestSiblings": true,
        "args": "none"
      }],
      "@typescript-eslint/consistent-type-imports": "error",

      // Code style
      "arrow-body-style": ["error", "as-needed"],
      "prefer-arrow-callback": "error",
      "prefer-const": "error"
    }
  }
]);
