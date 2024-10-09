const { join } = require('path');

const tsConfigFile = require(join(__dirname, 'tsconfig.json'));

const extendJsStandardsRules = [
  'airbnb-base',
  'airbnb/hooks',
];

const javascriptRules = {
  'no-sparse-arrays': 1,
  'no-plusplus': 0,
  'arrow-body-style': 0,
  'no-nested-ternary': 0,
  'no-await-in-loop': 1,
  'no-param-reassign': 1,
  'no-unused-vars': 1,
  'no-undef': 0,
  'no-shadow': 0,
  'no-use-before-define': 0,
  'global-require': 1,
  'import/order': 0,
  'import/prefer-default-export': 0,
  'import/extensions': 0,
  'import/no-extraneous-dependencies': 0,
  'import/no-relative-packages': 0,
  'react-hooks/exhaustive-deps': 1,
  'class-methods-use-this': 1,
};

const json = [
  {
    files: ['*.json'],
    parser: 'jsonc-eslint-parser',
    extends: [
      'plugin:jsonc/all',
    ],
    rules: {
      'jsonc/indent': ['error', 2],
    },
  },
  {
    files: ['tsconfig.json', 'tsconfig.*.json', 'package.json'],
    rules: {
      'jsonc/key-name-casing': 0,
      'jsonc/sort-keys': 0,
    },
  },
];

const javascript = [
  {
    files: ['*.js', '*.jsx', '*.mjs'],
    extends: [
      ...extendJsStandardsRules,
    ],
    rules: {
      ...javascriptRules,
    },
  },
  {
    files: ['.eslintrc.js'],
    rules: {
      'import/no-dynamic-require': 0,
    },
  },
];

const typescript = [
  {
    files: ['*.ts', '*.tsx'],
    parser: '@typescript-eslint/parser',
    extends: [
      ...extendJsStandardsRules,
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      ...javascriptRules,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-shadow': 1,
      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/no-unused-vars': 1,
      '@typescript-eslint/no-unsafe-function-type': 1,
      '@typescript-eslint/no-require-imports': 1,
    },
    plugins: ['@typescript-eslint'],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx', '.d.ts'],
        },
        typescript: {
          project: tsConfigFile,
        },
      },
    },
  },
  {
    files: ['jest.config.ts'],
    rules: {
      'global-require': 0,
      'import/no-dynamic-require': 0,
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
];

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['eslint-plugin-local-rules'],
  ignorePatterns: [
    '!.imports',
    '!@modules',
    '!.storybook',
    'node_modules',
    'storybook-static',
    'tmp',
  ],
  overrides: [
    ...javascript,
    ...typescript,
    ...json,
  ],
};
