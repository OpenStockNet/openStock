// Careful! eslint version is currently higher than react-script,
// It's temporarily fixed by adding a condition in .env
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
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
  ],
  // parser: 'babel-eslint',
  rules: {
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-alert': 0,
    'no-console': 0,
    'global-require': 0,
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'import/prefer-default-export': 0,
  },
  ignorePatterns: [
    'build/*',
    'node_modules/*',
  ],
};
