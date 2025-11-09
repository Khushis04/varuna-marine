import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  {
    ignores: ["dist/**", "node_modules/**"]
  },

  ...tseslint.config(
    {
      files: ["**/*.ts"],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          project: "./tsconfig.json",
          tsconfigRootDir: process.cwd()
        },
        globals: {
          ...globals.node
        }
      },
      plugins: {
        "@typescript-eslint": tseslint.plugin
      },
      rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "warn",
        "no-console": "off",
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
      }
    }
  )
];

