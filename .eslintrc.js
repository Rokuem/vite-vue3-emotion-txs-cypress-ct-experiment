module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:radar/recommended',
    'plugin:unicorn/recommended',
    'plugin:compat/recommended',
    'plugin:promise/recommended',
    'plugin:array-func/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'radar',
    'unicorn',
    'compat',
    '@emotion',
    'array-func',
    'write-good-comments',
    'sort-keys-fix',
    'promise',
    'simple-import-sort',
    'plugin:jsonc/base',
  ],
  rules: {
    '@emotion/syntax-preference': [2, 'string'],
    'unicorn/filename-case': 'camelCase',
    indent: 0,
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'sort-keys-fix/sort-keys-fix': 'warn',
    'write-good-comments/write-good-comments': 'warn',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
