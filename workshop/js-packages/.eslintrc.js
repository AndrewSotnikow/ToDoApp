const { join } = require('path');

const tsConfigFile = require(join(__dirname, 'tsconfig.json'));

const extendJsStandardsRules = [
  'airbnb-base',
  'airbnb/hooks',
];

const javascriptRules = {
  'no-sparse-arrays': 1,
  'no-use-before-define': 0,
  'global-require': 1,
  'import/order': 0,
  'import/prefer-default-export': 0,
  'import/extensions': 0,
  'import/no-extraneous-dependencies': 0,
  'import/no-relative-packages': 0,
};

const html = [
  {
    files: ['*.html'],
    parser: '@html-eslint/parser',
    plugins: [
      '@html-eslint',
      'html',
    ],
    extends: ['plugin:@html-eslint/recommended'],
    rules: {
      '@html-eslint/no-duplicate-id': 'error',
      '@html-eslint/indent': ['error', 2],
    },
  },
];

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
      '@typescript-eslint/no-shadow': 1,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/ban-ts-comment': 0,
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
  ignorePatterns: [
    '!.storybook',
  ],
  overrides: [
    ...javascript,
    ...typescript,
    ...html,
    ...json,
  ],
};
