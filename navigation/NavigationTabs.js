import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Client from '../pages/Client';
import BookScreen from '../pages/Book';
import RentalBook from '../pages/RentalBook';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <NavigationContainer independent={true}>
            <Tab.Navigator 
            tabBarOptions={{
                activeColor: 'blue',
                inactiveColor: 'white',
                style: {
                    backgroundColor: 'rgba(48, 51, 118, 0.8)',
                    position: 'absolute',
                    borderTopWidth: 0,
                }
            }}>
                <Tab.Screen 
                name="Book"
                component={BookScreen}
                options={{
                    tabBarIcon: ({ size, color })  => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                    title: 'Book'
                }}/>
                <Tab.Screen 
                name="Client"
                component={Client}
                options={{
                    tabBarIcon: ({ size, color })  => (
                        <Ionicons name="people" size={size} color={color} />
                    ),
                    title: 'Client'
                }}/>
                <Tab.Screen 
                name="Rent"
                component={RentalBook}
                options={{
                    tabBarIcon: ({ size, color })  => (
                        <Ionicons name="cash" size={size} color={color} />
                    ),
                    title: 'Rent'
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );

}
export default Tabs;