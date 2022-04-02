import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack'

import Welcome from 'view/Welcome'

import AppRoutes from './app'

const Stack = createStackNavigator()

type ParamList = {
  [key: string]: any
}

export type NavigationParameters = StackNavigationProp<ParamList, 'Welcome'>

interface Props {
  initialRoute: 'Welcome' | 'App'
}

const Routes = ({ initialRoute }: Props) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="App" component={AppRoutes} />
    </Stack.Navigator>
  )
}

export default Routes
