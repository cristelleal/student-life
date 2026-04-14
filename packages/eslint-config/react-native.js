import reactConfig from './react.js';

export default [
  ...reactConfig,
  {
    rules: {
      // TypeScript handles prop validation in React Native projects
      'react/prop-types': 'off',
    },
  },
];
