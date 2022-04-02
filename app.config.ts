import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Blima',
  slug: 'blima-app',
  version: '1.0.0',
  assetBundlePatterns: ['**/*'],
  userInterfaceStyle: 'automatic',
  platforms: ['android', 'ios'],
  ios: {
    supportsTablet: false
  }
})
