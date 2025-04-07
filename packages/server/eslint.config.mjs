import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { 
      globals: globals.node,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    }
  },
  { 
    files: ["**/*.{js,mjs,cjs,ts}"], 
    plugins: { js }, 
    extends: ["js/recommended"] 
  },
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      // Error prevention
      "no-unused-vars": "error",
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-return-await": "error",
      "no-promise-executor-return": "error",
      "no-param-reassign": "error",
      "no-throw-literal": "error",
      
      // TypeScript specific
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "prefix": ["I"]
        },
        {
          "selector": "typeAlias",
          "format": ["PascalCase"]
        }
      ],
      
      // Code style
      "arrow-body-style": ["error", "as-needed"],
      "prefer-arrow-callback": "error",
      "prefer-const": "error"
    }
  }
]);