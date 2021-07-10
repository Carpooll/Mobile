// Structure of the screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"
import Layout from "./Layout"

// Screens
import Login from '../Login/Login'
import SignUpData from '../Signup/SignupData'
import SignUpAdrress from '../Signup/SignupAddress'
import SignupPayment from '../Signup/SignupPayment'
import SignupCar from '../Signup/SignupCar'
import HomeDriver from "../Home/HomeDriver"
import HomePassenger1 from '../Home/HomePassenger'
import EditProfileDriver from '../Edit/EditProfileDriver'
import EditProfilePassenger from "../Edit/EditProfilePassenger"
import DriverDetailsPrivate from '../Details/DetailsPrivate'
import ProfileDriver from "../Profiles/ProfileDriver"
import PassengerPublicProfile from '../Profiles/ProfilePassenger'
import PassengerPrivate from '../Profiles/ProfilePassengerPrivate'
import Notifications from '../Notifications/Notifications'

const Stack = createStackNavigator()

const BadgesStack = () =>{
    return(
        <Stack.Navigator
            screenOptions={{
            }}>
            <Stack.Screen 
                name="Welcome"
                component={SignUpAdrress}
                options={{headerShown: false}}
            />

        </Stack.Navigator>
    );
}

export default BadgesStack;