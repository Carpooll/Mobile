import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Colors from '../../res/Colors';
import Layout from './Layout';
import SignupPayment from '../Signup/SignupPayment';
import Notifications from '../Notifications/Notifications';
import ProfileDriver from '../Profiles/ProfileDriver';
import HomeDriver from '../Home/HomeDriver';
import SignupCar from '../Signup/SignupCar';
import Login from '../Login/Login';
import SignUpData from '../Signup/Signup';
import SignUpAdrress from '../Signup/SignupAddress';
import EditProfileDriver from '../Edit/EditProfileDriver';
import EditProfilePassenger from '../Edit/EditProfilePassenger';
import DriverDetailsPrivate from '../Details/DetailsPrivate';
import HomePassenger1 from '../Home/HomePassenger';
import PassengerPublicProfile from '../Profiles/ProfilePassenger';
import PassengerPrivate from '../Profiles/ProfilePassengerPrivate';
import LocationAddress from '../LatLong/Address'
import LocationCurrentPosition from '../LatLong/LatLong'

const Stack = createStackNavigator();

const BadgesStack = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SignUpData"
        component={SignUpData}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SignUpAdrress"
        component={SignUpAdrress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupCar"
        component={SignupCar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupPayment"
        component={SignupPayment}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="HomeDriver"
        component={HomeDriver}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="HomePassenger"
        component={HomePassenger1}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LocationAddress"
        component={LocationAddress}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name="LocationCurrentPosition"
        component={LocationCurrentPosition}
        options={{headerShown: false}}
      />
      

    </Stack.Navigator>
  );
};

export default BadgesStack;