/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const nextPlugin = require('@next/eslint-plugin-next');
const pluginJs = require('@eslint/js');
const tseslint = require('typescript-eslint');
const tailwind = require('eslint-plugin-tailwindcss');

/** @type {import('eslint').Linter.Config[]} */
const config = [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'no-console': 'warn',
      'no-empty-pattern': 'warn',
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },
];

module.exports = config;
