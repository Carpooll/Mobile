import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"

// Tab Navigators
import TabNavigator from "./TabNavigator.js"
import TabNavigatorDriver from "./TabNavigatorDriver.js"
import TabNavigatorPassenger from "./TabNavigatorPassenger.js"

// Login
import Login from '../Login/Login'

// Sign up 
import SignupSelection from "../Signup/SignupSelection"     // Step 1 x
import SignUpData from '../Signup/Signup'                   // Step 2 x
import SignUpAddress from '../Signup/SignupAddress'         // Step 3 x
import SignupPayment from '../Signup/SignupPayment'         // Step 4 (driver only) x
import SignupCar from '../Signup/SignupCar'                 // Step 5 (driver only)

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

            <Stack.Screen name="TabNavigator" component={TabNavigator}/>
            <Stack.Screen name="TabNavigatorDriver" component={TabNavigatorDriver}/>
            <Stack.Screen name="TabNavigatorPassenger" component={TabNavigatorPassenger}/>

        </Stack.Navigator>
    );
}

export default AppStack