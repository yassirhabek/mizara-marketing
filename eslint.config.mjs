import next from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "drizzle/**"] },
  ...next,
  ...nextTs,
];

export default eslintConfig;
