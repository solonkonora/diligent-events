// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   {
//     ignores: ["dist/*", "node_modules/*", "*.generated.ts"],
//   },
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     rules: {
//       "@typescript-eslint/no-unused-vars": [
//         "error",
//         {
//           argsIgnorePattern: "^_",
//           varsIgnorePattern: "^_",
//           ignoreRestSiblings: true,
//         },
//       ],
//     },
//   }
// ];

import globals from "globals";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import nextPlugin from "@next/eslint-plugin-next";
import typescript from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      ".vscode/**",
      "**/*.min.js",
      ".next/**",
      "babel.config.js",
      "postcss.config.js",
      "coverage/**",
    ],
  },

  {
    files: ["**/*.{js,jsx,cjs,ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettier,
      next: nextPlugin,
    },
    languageOptions: {
      parser: typescript, // Use TypeScript parser
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
        // project: true, // Automatically detects tsconfig.json
        tsconfigRootDir: import.meta.dirname, // Root directory for TypeScript config
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        React: "readonly", // React global variable
        JSX: "readonly", // JSX global variable
      },
    },
    settings: {
      next: {
        rootDir: ".", // Next.js root directory
      },
    },
    rules: {
      ...js.configs.recommended.rules, // JavaScript recommended rules
      ...prettier.configs.recommended.rules, // Prettier recommended rules
      ...tsPlugin.configs.recommended.rules, // TypeScript recommended rules

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      // General rules for code quality and style
      "no-debugger": "error", // Disallow debugger statements
      quotes: ["warn", "double", { avoidEscape: true }], // Enforce double quotes
      semi: ["warn", "always"],
      indent: ["warn", 2],
      "eol-last": ["warn", "always"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-trailing-spaces": "warn",

      // Prettier integration for code formatting consistency
      "prettier/prettier": ["error", { singleQuote: false, endOfLine: "auto" }],

      // Disable rules that conflict with TypeScript
      "no-undef": "off",
    },
  },
];
