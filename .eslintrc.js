/* eslint semi: ["error", "never"] */
/* eslint linebreak-style: ["error", "windows"] */

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': 'off',
    'operator-linebreak': 'off'
  },
  'no-console': 'off'
}
