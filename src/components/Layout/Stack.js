// structure of the screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"
import Layout from "./Layout"
import Login from '../Login/Login'
import SignUpData from '../Signup/SignupData'

const Stack = createStackNavigator()

const BadgesStack = () =>{
    return(
        <Stack.Navigator
            screenOptions={{
            }}>
            <Stack.Screen 
                name="Welcome"
                component={SignUpData}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}

export default BadgesStack;