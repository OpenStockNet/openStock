// Careful! eslint version is currently higher than react-script,
// It's temporarily fixed by adding a condition in .env
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
  ],
  // parser: 'babel-eslint',
  rules: {
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-console': 0,
    'react/prefer-stateless-function': 0,
    'react/destructuring-assignment': 0,
    'import/prefer-default-export': 0,
    'object-shorthand': 0,
    'no-use-before-define': 1,
    'react/no-unescaped-entities': 0,
    'jsx-a11y/label-has-associated-control': 0,
  },
  ignorePatterns: [
    'build/*',
    'node_modules/*',
    'serviceWorker.js',
    'setupTests.js',
  ],
};
