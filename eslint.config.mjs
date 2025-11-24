import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    plugins: ['prettier'],
    rules: {
      // Prettier integration
      'prettier/prettier': ['error', { endOfLine: 'auto' }],

      // React/Next.js specific
      'react/display-name': 'off',
      '@next/next/no-img-element': 'off',

      // Import/export rules
      'import/no-cycle': 'off',
      // 'import/order': [
      //   'error',
      //   {
      //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      //     alphabetize: { order: 'asc' },
      //     'newlines-between': 'always',
      //     pathGroups: [
      //       { pattern: '*/**/*.scss', group: 'sibling', position: 'after' },
      //       { pattern: './*.scss', group: 'sibling', position: 'after' },
      //     ],
      //   },
      // ],

      // Code quality
      complexity: ['error', { max: 20 }],
      curly: ['error', 'all'],
      eqeqeq: 'error',
      'no-alert': 'error',
      'no-console': 'warn',
      'no-dupe-else-if': 'error',
      'no-empty': 'error',
      // 'no-fallthrough': 'error',
      // 'no-magic-numbers': ['warn', { ignore: [-1, 0, 1, 2] }],
      'no-template-curly-in-string': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',

      // TypeScript specific
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      // Formatting
      // 'padding-line-between-statements': [
      //   'error',
      //   {
      //     blankLine: 'always',
      //     prev: '*',
      //     next: ['return', 'block-like', 'throw', 'if', 'function', 'default'],
      //   },
      //   {
      //     blankLine: 'always',
      //     prev: ['block-like', 'throw', 'if', 'function'],
      //     next: '*',
      //   },
      // ],

      // Disabled rules to avoid conflicts
      'max-lines': 'off',
      'no-irregular-whitespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default': 'off',
      'prefer-destructuring': 'off',
      'no-control-regex': 'off',
      'linebreak-style': 'off',
    },
  }),
];

export default eslintConfig;
