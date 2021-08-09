import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Stack from '../Layout/Stack';
import Colors from '../../res/Colors';
import {createStackNavigator} from '@react-navigation/stack';
import Storage from '../../Libs/Storage';

// SCREENS
import Notifications from '../Notifications/NotificationsPass';
// Profiles
import PassengerPrivate from '../Profiles/ProfilePassengerPrivate';
// Home
import HomePassenger from '../Home/HomePassenger'; // when there's no driver
// import HomePassenger2 from '../Home/HomePassenger2' // when there's driver. No tiene nada jsjs
// Edit
import EditProfilePassenger from '../Edit/EditProfilePassenger';

import DetailsPrivate from '../../components/Details/DetailsPrivate'


import * as vars from '../Home/HomePassenger';
//import { driver } from '../../Libs/Sessions';

const Tabs = createBottomTabNavigator();

var driver = false;

checkDriver = async () => {
  try {
    console.log('esta cosa es es check a ver si es verdah ')
    token = await Storage.instance.get('token');
    let request = await fetch(
      `https://carpool-utch.herokuapp.com/passenger/driver/`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Token ' + token,
        },
      },
    );
    let response = await request.json();
    driverData=response

    driver = true;
    console.log(driver)
    return driver
  } catch (err) {
    console.log('Geting user info error', err);
    throw Error(err);
  }
};

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
          backgroundColor: Colors.white,
        },
      }}>

      {driver ? (
        <HomeStack.Screen
        name="DetailsPrivate"
        component={DetailsPrivate}
        options={{headerShown: false}}
      />
      ) : (
        <HomeStack.Screen
          name="HomePassenger"
          component={HomePassenger}
          options={{headerShown: false}}
        />
      )}
      {/* <HomeStack.Screen name="HomePassenger2" component={HomePassenger2} options={{ headerShown: false }} /> */}

      
    </HomeStack.Navigator>
  );
}

// Stack to redirect to screens between tab navigator (PROFILE)
const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      tabBarOptions={{
        // showLabel: false,
        headerShown: false,
        tintColor: Colors.blueLight,
        activeTintColor: Colors.blue,
        style: {
          backgroundColor: Colors.white,
        },
      }}>
      <ProfileStack.Screen
        name="PassengerPrivate"
        component={PassengerPrivate}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="EditProfilePassenger"
        component={EditProfilePassenger}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
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
          backgroundColor: Colors.white,
        },
      }}>
      {/* Each screen corresponds to an icon on the navbar */}
      <Tabs.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={{uri: 'https://i.imgur.com/c4ndYby.png'}}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileStackScreen}
        onPress={checkDriver()}
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={{uri: 'https://i.imgur.com/lAdvcUO.png'}}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={{uri: 'https://i.imgur.com/E8BiIPd.png'}}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
