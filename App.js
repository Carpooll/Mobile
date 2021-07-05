import React from 'react'

// NAVBAR
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Text
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import Colors from './src/res/Colors';

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function Balance() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Balance</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({              // Default options to use for the screens in the navigator.
          tabBarIcon: ({ focused, color, size }) => { //returns a React.Node, to display in the tab bar.
            let iconName; // ????

            if (route.name === 'Notifications') {
              iconName = focused                  // focused == pressed
                ? 'notifications'                 // if focused
                : 'notifications-outline';        //else
            } else if (route.name === 'Balance') {
              iconName = focused
                ? 'ios-list-box'
                : 'ios-list';
            } else if (route.name === 'Profile') {
              iconName = focused
                ? 'person-circle'
                : 'person-circle-outline'
            } else if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={Colors.blue} />;
          },
        })}

        tabBarOptions={{
          activeTintColor: Colors.blue,    // Color displayed when prop is clicked on
          inactiveTintColor: Colors.black, // Color displayed
        }}>

        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Balance" component={Balance} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Home" component={HomeScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}