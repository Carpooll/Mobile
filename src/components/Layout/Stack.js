// structure of the screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"
import Layout from "./Layout"
import Login from '../Login/Login'
import EditProfilePassenger from '../Edit/EditProfilePassenger'
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
        </Stack.Navigator>
    );
}

export default BadgesStack;