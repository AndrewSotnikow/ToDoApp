module.exports = {
  extends: '../js-packages/.eslintrc.js',
  overrides: [
    {
      files: [
        '**/@browser/**/test.ts',
        '**/@browser/**/test.tsx',
      ],
      rules: {
        'no-eval': 0,
      },
    },
  ],
};
