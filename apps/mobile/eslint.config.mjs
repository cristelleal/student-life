import reactNativeConfig from '@student-life/eslint-config/react-native';

export default [
  {
    ignores: ['babel.config.js', 'metro.config.js', 'tailwind.config.js'],
  },
  ...reactNativeConfig,
];
