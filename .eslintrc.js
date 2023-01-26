module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  rules: {
    'react/prop-types': 'off',
    'no-unused-vars': [2, { args: 'all', argsIgnorePattern: '^_' }]
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  }
}
