// eslint.config.mjs

import eslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: eslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Các quy tắc ESLint
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-console': 'warn',

      // Quy tắc cho TypeScript
      '@typescript-eslint/no-unused-vars': ['error'],

      // Quy tắc Prettier
      'prettier/prettier': 'error',
    },
  },
  // Thêm cấu hình Prettier vào cuối để tránh xung đột
  prettierConfig,
];
