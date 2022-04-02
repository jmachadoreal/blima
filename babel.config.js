module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],

    plugins: [
      [
        'babel-plugin-root-import',
        {
          paths: [
            {
              rootPathSuffix: './src/@types',
              rootPathPrefix: 'type/'
            },
            {
              rootPathSuffix: './src/assets/animations',
              rootPathPrefix: 'animation/'
            },
            {
              rootPathSuffix: './src/assets',
              rootPathPrefix: 'asset/'
            },
            {
              rootPathSuffix: './src/components',
              rootPathPrefix: 'component/'
            },
            {
              rootPathSuffix: './src/configs',
              rootPathPrefix: 'config/'
            },
            {
              rootPathSuffix: './src/helpers',
              rootPathPrefix: 'helper/'
            },
            {
              rootPathSuffix: './src/routes',
              rootPathPrefix: 'route/'
            },
            {
              rootPathSuffix: './src/contexts',
              rootPathPrefix: 'context/'
            },
            {
              rootPathSuffix: './src/services',
              rootPathPrefix: 'service/'
            },
            {
              rootPathSuffix: './src/views',
              rootPathPrefix: 'view/'
            }
          ]
        }
      ],
      'react-native-reanimated/plugin'
    ]
  }
}
