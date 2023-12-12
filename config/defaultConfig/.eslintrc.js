const { join } = require('path');

const tsConfigFile = require(join(__dirname, 'tsconfig.json'));

const typescriptReact = [
    {
        files: ['**/*.ts?(x)'],
        parser: '@typescript-eslint/parser',
        extends: [
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended'
        ],
        plugins: ['@typescript-eslint', 'react', 'react-hooks'],
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
        rules: {
            'quotes': ['error', 'single'],
            'linebreak-style': ['error', 'unix'],
            'react-hooks/rules-of-hooks': 'error',
            'no-restricted-globals': 'off',
            'no-prototype-builtins': 'off',
            'react/react-in-jsx-scope': 'off',
            'object-shorthand': 2,
            'prefer-object-spread': 2,
            'no-array-constructor': 2,
            'prefer-destructuring': ['error', { 'object': true, 'array': false }],
            'prefer-template': 2,
            'template-curly-spacing': 2,
            'prefer-arrow-callback': 2,
            'arrow-body-style': 2,
            'dot-notation': 2,
            'no-nested-ternary': 2,
            'no-unneeded-ternary': 2,
            'id-length': ['error', {
                'min': 3,
                'exceptions': ['t', 'x', 'y', 'dx', 'dy', '_', 'id', 'to', 'as', 'i', 'j'],
            }],
            'react-hooks/exhaustive-deps': 0,
        },
    },
].map((v) => ({
    ...v,
}));


const html = [
    {
        files: ['*.html'],
        parser: '@html-eslint/parser',
        plugins: ["@html-eslint"],
        overrides: [
            {
                files: ["*.html"],
                parser: "@html-eslint/parser",
                extends: ["plugin:@html-eslint/recommended"],
            },
        ],
    },
].map((config) => ({
    ...config
}));


const json = [
    {
        files: ['*.json'],
        parser: "jsonc-eslint-parser",
        extends: [
            'plugin:jsonc/recommended-with-json',
        ],
    },
].map((config) => ({
    ...config
}));

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    overrides: [
        ...html,
        ...json,
        ...typescriptReact,
    ],
};
