import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Client from '../pages/Client';
import BookScreen from '../pages/Book';
import RentalBook from '../pages/RentalBook';
import { ProfileScreen } from './../pages/Profile'
import { Trans, useTranslation } from 'react-i18next';
import CameraScreen from './../pages/Camera'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
    const { t } = useTranslation();

    return (
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
                name={t('book')}
                component={BookScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                    title: t('book')
                }} />
            <Tab.Screen
                name={t('client')}
                component={Client}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="people" size={size} color={color} />
                    ),
                    title: t('client')
                }} />
            <Tab.Screen
                name={t('rental_book')}
                component={RentalBook}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="cash" size={size} color={color} />
                    ),
                    title: t('rental_book')
                }} />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="ios-list" size={size} color={color} />
                    ),
                    title: t('profile')
                }} />

        </Tab.Navigator>
    );

}
export default Tabs;