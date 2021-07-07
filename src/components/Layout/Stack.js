// structure of the screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"
import Layout from "./Layout"
import SignupPayment from '../Signup/SignupPayment'
import Notifications from '../Notifications/Notifications'
import ProfileDriver from "../Profiles/ProfileDriver"
import HomeDriver from "../Home/HomeDriver"
import SignupCar from '../Signup/SignupCar'
import Login from '../Login/Login'
import SignUpData from '../Signup/SignupData'
import SignUpAdrress from '../Signup/SignupAddress'
import EditProfileDriver from '../Edit/EditProfileDriver'
import EditProfilePassenger from "../Edit/EditProfilePassenger"
import DriverDetailsPrivate from '../Details/DetailsPrivate'
import HomePassenger1 from '../Home/HomePassenger'
import PassengerPublicProfile from '../Profiles/ProfilePassenger'
import PassengerPrivate from '../Profiles/ProfilePassengerPrivate'

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
            <Stack.Screen name="SignupCar" component={SignupCar}/>

        </Stack.Navigator>
    );
}

export default BadgesStack;