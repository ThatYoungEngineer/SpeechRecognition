import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Messages from './src/pages/Messages';
import BookACall from './src/pages/BookACall';
import { Image, StyleSheet } from 'react-native';
import COLORS from './src/constants/colors';

const App = () => {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator initialRouteName='Chat' screenOptions={{headerShown: false,
        tabBarLabelStyle: { fontSize: 12, fontWeight: 400 },
        tabBarActiveTintColor: COLORS.themeColor,
        tabBarInactiveTintColor: COLORS.mediumGray
      }}>
        <Tab.Screen name="Chat" component={Messages} options={{tabBarIcon: ({focused}) => <Image style={{...styles.messageIcon, opacity: focused ? 1 : 0.3}} source={require('./src/assets/message.png')} /> }} />
        <Tab.Screen name="Book A Call" component={BookACall} options={{headerShown: true, headerTintColor: COLORS.white, headerStyle: {backgroundColor: COLORS.themeColor}, tabBarIcon: ({focused}) => <Image style={{...styles.callIcon, opacity: focused ? 1 : 0.3
          
        }} source={require('./src/assets/phone-call.png')} /> }} />
      </Tab.Navigator>
    )
  }

  return (
    // <AssemblyAI />    // AssemblyAI service API to get text from speech

    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  messageIcon: {
    width: 20,
    height: 20,
  },
  callIcon: {
    width: 20,
    height: 20,
  }
})

export default App
