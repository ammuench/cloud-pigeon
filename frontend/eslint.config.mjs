import simpleImportSort from "eslint-plugin-simple-import-sort";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  ignores: [
    "**/wailsjs/",
    "**/.nuxt/",
    "**/.output/",
    "**/build/",
    "**/scripts/",
    "**/assets/",
  ],
  plugins: {
    "simple-import-sort": simpleImportSort,
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
});
