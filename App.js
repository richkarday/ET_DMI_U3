import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from './navigation/NavigationTabs';
import Login from './pages/Login'
import SingupScreen from './pages/Singup'
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
       <Stack.Screen name='Tabs'  component={Tabs}  options={{ headerShown: false }}/>
       <Stack.Screen name='Singup' component={SingupScreen}/>
     </Stack.Navigator>
     </NavigationContainer>
  );
}


