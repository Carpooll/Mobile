// structure of the screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"
import Layout from "./Layout"
import HomePassenger from '../Home/HomePassenger'

const Stack = createStackNavigator()

const BadgesStack = () =>{
    return(
        <Stack.Navigator
            screenOptions={{
            }}>
            <Stack.Screen 
                name="Welcome"
                component={HomePassenger}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}

export default BadgesStack;