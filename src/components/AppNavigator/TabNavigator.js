import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Stack from '../Layout/Stack'
import Colors from '../../res/Colors'
import Page from '../test/Page'

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