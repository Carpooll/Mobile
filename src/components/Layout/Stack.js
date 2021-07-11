// Structure of the screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"
import Layout from "./Layout"

// Screens
import Login from '../Login/Login' //finished
import SignUpData from '../Signup/SignupData' //finished
import SignUpAdrress from '../Signup/SignupAddress' //finished
import SignupPayment from '../Signup/SignupPayment' //finished
import SignupCar from '../Signup/SignupCar' //finished
import HomeDriver from "../Home/HomeDriver"//finished
import HomePassenger1 from '../Home/HomePassenger' //finished
import EditProfileDriver from '../Edit/EditProfileDriver'//finished
import EditProfilePassenger from "../Edit/EditProfilePassenger" //finished
import DriverDetailsPrivate from '../Details/DetailsPrivate' //finished
import ProfileDriver from "../Profiles/ProfileDriver" //finished
import PassengerPublicProfile from '../Profiles/ProfilePassenger'
import PassengerPrivate from '../Profiles/ProfilePassengerPrivate'//finished
import Notifications from '../Notifications/Notifications' //finished

const Stack = createStackNavigator()

const BadgesStack = () =>{
    return(
        <Stack.Navigator
            screenOptions={{
            }}>
            <Stack.Screen 
                name="Welcome"
                component={PassengerPublicProfile}
                options={{headerShown: false}}
            />

        </Stack.Navigator>
    );
}

export default BadgesStack;