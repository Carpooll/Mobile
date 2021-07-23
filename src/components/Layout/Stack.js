// Structure of the screens
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../res/Colors';
import Layout from './Layout';

// Screens
import Login from '../Login/Login';
import HomeDriver from '../Home/HomeDriver';
import HomePassenger1 from '../Home/HomePassenger';
import SignUpData from '../Signup/Signup';
import SignUpAdrress from '../Signup/SignupAddress';
import SignupPayment from '../Signup/SignupPayment';
import SignupCar from '../Signup/SignupCar';
import SignupSelection from '../Signup/SignupSelection';
import EditProfileDriver from '../Edit/EditProfileDriver';
import EditProfilePassenger from '../Edit/EditProfilePassenger';
import DriverDetailsPrivate from '../Details/DetailsPrivate';
import ProfileDriver from '../Profiles/ProfileDriver';
import PassengerPublicProfile from '../Profiles/ProfilePassenger';
import PassengerPrivate from '../Profiles/ProfilePassengerPrivate';
import Notifications from '../Notifications/Notifications';
import Selection from '../Signup/SignupSelection';

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
        name="Selection"
        component={Selection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default BadgesStack;
