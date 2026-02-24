import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: ["coverage/**", ".next/**", "node_modules/**"],
  },
  ...nextCoreWebVitals,
  {
    files: ["**/__tests__/**/*.{js,jsx}", "**/*.{test,spec}.{js,jsx}"],
    rules: {
      "react/display-name": "off",
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
