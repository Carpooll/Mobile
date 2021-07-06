// structure of the screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"
import Layout from "./Layout"
import ProfileDriver from "../Profiles/ProfileDriver"
import HomeDriver from "../Home/HomeDriver"
import SignupCar from '../Signup/SignupCar'
import Login from '../Login/Login'
import EditProfileDriver from '../Edit/EditProfileDriver'
import EditProfilePassenger from "../Edit/EditProfilePassenger"
import DriverDetailsPrivate from '../Details/DetailsPrivate'
import HomePassenger1 from '../Home/HomePassenger'

const Stack = createStackNavigator()

const BadgesStack = () =>{
    return(
        <Stack.Navigator
            screenOptions={{
            }}>
            <Stack.Screen 
                name="Welcome"
                component={EditProfilePassenger}
                options={{headerShown: false}}
            />
            <Stack.Screen name="SignupCar" component={SignupCar}/>
        </Stack.Navigator>
    );
}

export default BadgesStack;