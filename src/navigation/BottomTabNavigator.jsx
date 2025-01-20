import {Image, StyleSheet} from 'react-native';

import COLORS from '../constants/colors';

import Messages from '../pages/Messages';
import BookACall from '../pages/BookACall';

import Language from '../components/Language';

import {useGlobal} from '../context/GlobalContext';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const {globalLanguage} = useGlobal();
  const language = Language(globalLanguage);

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName={language.chat}
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {fontSize: 12, fontWeight: 400},
          tabBarActiveTintColor: COLORS.themeColor,
          tabBarInactiveTintColor: COLORS.mediumGray,
        }}
      >
        <Tab.Screen
          name={language.chat}
          component={Messages}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                style={{...styles.messageIcon, opacity: focused ? 1 : 0.3}}
                source={require('../assets/message.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name={language.bookACall}
          component={BookACall}
          options={{
            headerShown: true,
            headerTintColor: COLORS.white,
            headerStyle: {backgroundColor: COLORS.themeColor},
            tabBarIcon: ({focused}) => (
              <Image
                style={{...styles.callIcon, opacity: focused ? 1 : 0.3}}
                source={require('../assets/phone-call.png')}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return TabNavigator();
};

const styles = StyleSheet.create({
  messageIcon: {
    width: 20,
    height: 20,
  },
  callIcon: {
    width: 20,
    height: 20,
  },
});

export default BottomTabNavigator;
