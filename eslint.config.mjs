// Root ESLint config — used by lint-staged (fast, no type-checking).
// Each package keeps its own config for `npm run lint` (with full type checking).
import baseConfig from '@student-life/eslint-config/base';
import reactConfig from '@student-life/eslint-config/react';
import reactNativeConfig from '@student-life/eslint-config/react-native';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/coverage/**',
      '**/.turbo/**',
    ],
  },

  // Base TypeScript + Prettier rules for all TS/JS files
  ...baseConfig,

  // React rules scoped to web only
  ...reactConfig.map((c) => ({ ...c, files: ['apps/web/**/*.{ts,tsx}'] })),

  // React Native rules scoped to mobile (already includes React rules)
  ...reactNativeConfig.map((c) => ({
    ...c,
    files: ['apps/mobile/**/*.{ts,tsx}'],
  })),

  // Node globals for backend and test files
  {
    files: [
      'apps/backend/api/**/*.ts',
      '**/*.spec.ts',
      '**/*.test.ts',
      '**/*.e2e-spec.ts',
    ],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];
