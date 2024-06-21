import React from 'react';
import {Stack, Tabs} from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
    // const colorScheme = useColorScheme();

    return (
        <Tabs screenOptions={{
                tabBarActiveTintColor: Colors.light.blue["50"],
                headerShown: false,
                tabBarShowLabel: false
        }}>
            <Tabs.Screen name="home"
                         options={{ tabBarIcon: ({color}) => <MaterialIcons name="home" size={28} color={ color } /> }}
            />

            <Tabs.Screen name="room"
                         options={ {tabBarIcon: ({color}) => <MaterialIcons name="room" size={28} color={ color } />}}
            />

            <Tabs.Screen name="add_device"
                         options={{ tabBarIcon: ({color}) => <MaterialIcons name="add" size={28} color={ color } /> }}
            />

            <Tabs.Screen name="security"
                         options={{ tabBarIcon: ({color}) => <MaterialIcons name="shield" size={28} color={ color } /> }}
            />

            <Tabs.Screen name="stats"
                         options={{ tabBarIcon: ({color}) => <MaterialIcons name="bar-chart" size={28} color={ color } /> }}
            />
        </Tabs>
    );
}
