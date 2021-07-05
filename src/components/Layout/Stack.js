// structure of the screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"
import Layout from "./Layout"
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
                component={SignupCar}
                options={{headerShown: false}}
            />
            <Stack.Screen name="SignupCar" component={SignupCar}/>
        </Stack.Navigator>
    );
}

export default BadgesStack;