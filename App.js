import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tabs from './navigation/NavigationTabs';
import Login from './pages/Login'

export default function App() {

  return (
    <Login />
  );
}


