/** @type {import("prettier").Config} */
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 120,
  singleQuote: true,
  semi: true,
  trailingComma: "all",
  overrides: [{ files: ["*.md", "*.mdx"], options: { proseWrap: "preserve" } }],
};
