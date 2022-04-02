import { createStackNavigator } from '@react-navigation/stack'

import Browser from 'view/Browser'
import Home from 'view/Home'

import LocationProvider from 'context/Location'

const Stack = createStackNavigator()

const AppRoutes = () => {
  return (
    <LocationProvider>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress
              }
            }
          },
          cardStyle: {
            backgroundColor: 'transparent'
          }
        }}
      >
        <Stack.Screen name="Index" component={Home} />
        <Stack.Screen name="Browser" component={Browser} />
      </Stack.Navigator>
    </LocationProvider>
  )
}

export default AppRoutes
