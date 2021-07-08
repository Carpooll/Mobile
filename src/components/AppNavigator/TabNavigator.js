import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Stack from '../Layout/Stack'
import Colors from '../../res/Colors'
import Page from '../test/Page'

const Tabs = createBottomTabNavigator()

// ICONS:
// notifications: https://i.imgur.com/c4ndYby.png
// balance: https://i.imgur.com/EZFEd1v.png
// account: https://i.imgur.com/lAdvcUO.png
// home: https://i.imgur.com/E8BiIPd.png

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
                component={Page}
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
                name="Balance"
                component={Page}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Image
                            style={{ tintColor: color, width: size, height: size }}
                            source={{ uri: 'https://i.imgur.com/EZFEd1v.png' }}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="Account"
                component={Page}
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
                component={Page}
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