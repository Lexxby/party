module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    indent: 'off',
    semi: [2, 'always'],
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
    'comma-dangle': ['error', 'never'],
    'multiline-ternary': ['off'],
    'no-debugger': ['off']
  }
};
