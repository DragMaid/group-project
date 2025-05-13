import eslintBaseConfig from "eslintconfig/eslint.base.config.mjs";

const eslintConfig = [
  // Bring in the base rules
  ...eslintBaseConfig,

  // Override Next.js-specific rules for non-Next.js packages
  {
    rules: {
      "next/no-html-link-for-pages": 0,
    },
  },
];

export default eslintConfig;
