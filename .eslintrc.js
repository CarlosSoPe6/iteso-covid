module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    "linebreak-style": 0
  },
  overrides: [
    {
      files: ['**/**/*.js', '*.js'],
    },
  ],
};
