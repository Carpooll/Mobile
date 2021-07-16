import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Stack from '../Layout/Stack'
import Colors from '../../res/Colors'

// Screens
import Notifications from '../Notifications/Notifications'
// Profiles
import ProfileDriver from '../Profiles/ProfileDriver'
import PassengerPublicProfile from '../Profiles/ProfilePassenger'
// Home
import HomeDriver from '../Home/HomeDriver'
import HomePassenger from '../Home/HomePassenger'
import HomePassenger2 from '../Home/HomePassenger2'

const Tabs = createBottomTabNavigator()


const TabNavigator = () => {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                showLabel: false,
                tintColor: Colors.blueLight,
                activeTintColor: Colors.blue,
                style: {
                    backgroundColor: Colors.white
                }
            }}>
            {/* Each screen corresponds to an icon on the navbar */}
            <Tabs.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Image
                            style={{ tintColor: color, width: size, height: size }}
                            source={{ uri: 'https://i.imgur.com/c4ndYby.png' }}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="Account"
                component={ProfileDriver}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Image
                            style={{ tintColor: color, width: size, height: size }}
                            source={{ uri: 'https://i.imgur.com/lAdvcUO.png' }}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="Home"
                component={HomeDriver}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Image
                            style={{ tintColor: color, width: size, height: size }}
                            source={{ uri: 'https://i.imgur.com/E8BiIPd.png' }}
                        />
                    )
                }}
            />
        </Tabs.Navigator>
    )
}

export default TabNavigator