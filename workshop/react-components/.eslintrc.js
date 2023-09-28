module.exports = {
  extends: '../js-packages/.eslintrc.js',
  overrides: [
    {
      files: [
        'test.tsx',
      ],
      rules: {
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
  ],
};
