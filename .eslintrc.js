module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-underscore-dangle': 0,
  },
  // ignore checking client folder
  ignorePatterns: [
    'client/*',
    'node_modules/*',
  ],
};
