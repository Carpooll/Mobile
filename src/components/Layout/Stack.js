// structure of the screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"
import Layout from "./Layout"
import SignupCar from '../Signup/SignupCar'

const Stack = createStackNavigator()

const BadgesStack = () =>{
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor: Colors.black,
                    shadowColor: Colors.black,
                },
                headerTintColor: Colors.white,
            }}>
            <Stack.Screen 
                name="Layout" 
                component={Layout} 
                options={{headerShown: false}}
            />
            <Stack.Screen name="SignupCar" component={SignupCar}/>
        </Stack.Navigator>
    );
}

export default BadgesStack;