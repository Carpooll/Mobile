import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Stack from '../Layout/Stack'
import Colors from '../../res/Colors'
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import Notifications from '../Notifications/NotificationsPass'
// Profiles
import ProfileDriver from '../Profiles/ProfileDriver'
import PassengerPublicProfile from '../Profiles/ProfilePassenger'
// Home
import HomeDriver from '../Home/HomeDriver'
import HomePassenger from '../Home/HomePassenger' // PASSENGER: To find a driver
import HomePassenger2 from '../Home/HomePassenger2' // PASSENGER: When he has a driver
// Edit
import EditProfileDriver from '../Edit/EditProfileDriver'

// This is old tabnav. May get deleted later but kept to test

const Tabs = createBottomTabNavigator()

// Stack to redirect to screens between tab navigator (HOME)
const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            tabBarOptions={{
                // showLabel: false,
                tintColor: Colors.blueLight,
                activeTintColor: Colors.blue,
                style: {
                    backgroundColor: Colors.white
                }
            }}
        >
            <HomeStack.Screen name="HomeDriver" component={HomeDriver} options={{ headerShown: false }} />
            <HomeStack.Screen name="PassengerPublicProfile" component={PassengerPublicProfile} options={{ headerShown: false }} />

        </HomeStack.Navigator>
    )
}

// Stack to redirect to screens between tab navigator (PROFILE)
const ProfileStack = createStackNavigator()
function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator
            tabBarOptions={{
                // showLabel: false,
                headerShown: false,
                tintColor: Colors.blueLight,
                activeTintColor: Colors.blue,
                style: {
                    backgroundColor: Colors.white
                }
            }}
        >
            <ProfileStack.Screen name="ProfileDriver" component={ProfileDriver} options={{ headerShown: false }} />
            <HomeStack.Screen name="EditProfileDriver" component={EditProfileDriver} options={{ headerShown: false }} />
        </ProfileStack.Navigator>
    )
}


const TabNavigator = () => {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                // showLabel: false,
                headerShown: false,
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
                name="Profile"
                component={ProfileStackScreen}
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
                component={HomeStackScreen}
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