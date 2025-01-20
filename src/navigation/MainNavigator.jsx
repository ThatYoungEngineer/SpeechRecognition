import BottomTabNavigator from './BottomTabNavigator';
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const MainNavigator = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  )
}

export default MainNavigator