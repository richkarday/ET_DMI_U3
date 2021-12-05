import React from 'react';
import Client from './pages/Client';
import BookScreen from './pages/Book';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeColor: 'blue',
        inactiveColor: 'white',
        style: {
          backgroundColor: 'rgba(48, 51, 118, 0.8)',
          position: 'absolute',
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Client"
        component={Client}
        options={{
          title: 'Client'
        }}
      />
      <Tab.Screen
        name="Book"
        component={BookScreen}
        options={{
          title: 'Book'
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {

  return (
    <NavigationContainer> 
      <BottomTabNavigator/>
    </NavigationContainer>
  );
}


