// structure of the screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"
import Layout from "./Layout"
import ProfileDriver from "../Profiles/ProfileDriver"
import HomeDriver from "../Home/HomeDriver"
import SignupCar from '../Signup/SignupCar'
import Login from '../Login/Login'

const Stack = createStackNavigator()

const BadgesStack = () =>{
    return(
        <Stack.Navigator
            screenOptions={{
            }}>
            <Stack.Screen 
                name="Welcome"
                component={HomeDriver}
                options={{headerShown: false}}
            />
            <Stack.Screen name="SignupCar" component={SignupCar}/>
        </Stack.Navigator>
    );
}

export default BadgesStack;