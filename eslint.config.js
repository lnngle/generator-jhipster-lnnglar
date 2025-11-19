import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['generators/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        document: 'readonly',
        window: 'readonly',
      },
    },
  },
]
