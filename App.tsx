import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import AboutApp from './aboutapp';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const linking = {
    prefixes: ['exp://127.0.0.1:19000/--', 'exp.host/@jglchen/web-scrape/--'],
    config: {
      screens: {
        Home: 'home'
      },
    },
  };
  
  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator  
        screenOptions={{
          tabBarInactiveTintColor: 'gray',
        }}
        initialRouteName="Home"
        >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: 'Web Scraping Demonstrations', tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }} />

        <Tab.Screen 
          name="About App" 
          component={AboutApp} 
          options={{ headerTitle: 'About This App', tabBarLabel: 'About',
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? 'information-circle' : 'information-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }} />
      
      </Tab.Navigator>
    </NavigationContainer>
  );
}