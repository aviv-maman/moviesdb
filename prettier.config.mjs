/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  $schema: "https://json.schemastore.org/prettierrc",
  singleQuote: false,
  printWidth: 120,
  trailingComma: "all",
  jsxSingleQuote: false,
  arrowParens: "always",
  bracketSameLine: true,
  tabWidth: 2,
  importOrder: ["<BUILTIN_MODULES>", "<THIRD_PARTY_MODULES>", "^./(.*)$"],
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderSideEffects: false,
  tailwindFunctions: ["cn"],
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};

export default config;
