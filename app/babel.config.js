module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver', // To resolve custom paths
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@patches': './src/patches',
          '@service': './src/service',
          '@state': './src/state',
          '@styles': './src/styles',
          '@types': './src/types',
          '@utils': './src/utils',
          '@': './src',
        },
      },
    ],
  ],
};
