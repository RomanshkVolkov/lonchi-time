import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-duplicate-imports': 'error',
      'no-self-compare': 'error',
      'use-isnan': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'class-methods-use-this': 'error',
      curly: ['error', 'multi-line'],
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
      'no-useless-concat': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'require-await': 'error',
      'array-bracket-spacing': 'error',
      'arrow-parens': 'error',
      'brace-style': 'error',
      'comma-dangle': ['error', 'only-multiline'],
      'jsx-quotes': ['error', 'prefer-double'],
      'keyword-spacing': [
        'error',
        {
          before: true,
        },
      ],
      'key-spacing': [
        'error',
        {
          afterColon: true,
        },
      ],
      'object-curly-spacing': ['error', 'always'],
      quotes: ['error', 'single'],
      semi: 'error',
      'space-before-blocks': 'error',
    },
  }),
];

export default eslintConfig;
