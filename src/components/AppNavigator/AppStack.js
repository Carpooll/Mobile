import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Layout from "../Layout/Layout"
import Colors from "../../res/Colors"

import TabNavigator from "./TabNavigator.js"

// Screens
import Login from '../Login/Login'
import HomeDriver from "../Home/HomeDriver"
import HomePassenger1 from '../Home/HomePassenger'
import SignupSelection from "../Signup/SignupSelection"     // Step 1 x
import SignUpData from '../Signup/Signup'                   // Step 2 x
import SignUpAddress from '../Signup/SignupAddress'         // Step 3 x
import SignupPayment from '../Signup/SignupPayment'         // Step 4 (driver only) x
import SignupCar from '../Signup/SignupCar'                 // Step 5 (driver only)
import EditProfileDriver from '../Edit/EditProfileDriver'
import EditProfilePassenger from "../Edit/EditProfilePassenger" 
import DriverDetailsPrivate from '../Details/DetailsPrivate' 
import ProfileDriver from "../Profiles/ProfileDriver" 
import PassengerPublicProfile from '../Profiles/ProfilePassenger' 
import PassengerPrivate from '../Profiles/ProfilePassengerPrivate'
import Notifications from '../Notifications/Notifications' 

const Stack = createStackNavigator()

const AppStack = () => {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown:false,
                headerStyle: {
                    backgroundColor: Colors.black,
                    shadowColor: Colors.white
                },
                headerTintColor: Colors.white
        }}>

            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUpSelection" component={SignupSelection}/>
            <Stack.Screen name="SignUpData" component={SignUpData}/>
            <Stack.Screen name="SignUpAddress" component={SignUpAddress}/>
            <Stack.Screen name="SignupPayment" component={SignupPayment}/>
            <Stack.Screen name="SignupCar" component={SignupCar}/>
            <Stack.Screen name="PassengerPublicProfile" component={PassengerPublicProfile}/>
            <Stack.Screen name="TabNavigator" component={TabNavigator}/>

        </Stack.Navigator>
    );
}

export default AppStack