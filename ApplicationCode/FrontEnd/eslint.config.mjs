import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { 
      globals: globals.browser 
    },
    rules: {
      // Enable auto-fix for common issues
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "no-unused-vars": ["warn"],
      "comma-dangle": ["error", "always-multiline"],

      // React specific rules
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",

      // Import plugin rules
      "import/order": ["warn", {
        "groups": [["builtin", "external", "internal"]],
        "newlines-between": "always",
      }],

      // JSX Accessibility plugin
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/no-redundant-roles": "warn",
      
      // React Hooks plugin
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintPluginImport.configs.recommended,
  eslintPluginJsxA11y.configs.recommended,
  eslintPluginReactHooks.configs.recommended,
];
