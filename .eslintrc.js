const prettierConfig = require('./.prettierrc.js')

module.exports = {
  extends: [
    'eslint:recommended',
    'ts-react-important-stuff',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'simple-import-sort',
    '@typescript-eslint',
    'unicorn',
    'formatjs',
    'promise',
  ],
  rules: {
    quotes: ['error', 'single', 'avoid-escape'],
    curly: ['error', 'multi-line'],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^.+\\.s?css$'],
          ['^react', '(\\w-/)*'],
          [
            '^\\u0000',
            '^@declarations',
            '^@core',
            '^@i18n',
            '^@theme',
            '^@store',
            '^@router',
            '^@icons',
            '^@ui',
            '^@',
            '^\\.',
          ],
        ],
      },
    ],
    'unicorn/filename-case': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/prefer-object-from-entries': 'off',
    'unicorn/no-static-only-class': 'off',
    'unicorn/no-useless-undefined': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/jsx-no-literals': 'off',
    'react/react-in-jsx-scope': 'off',
    'jest/expect-expect': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'no-console': ['warn', { allow: ['error'] }],
    'prettier/prettier': ['error', prettierConfig],
  },
}
