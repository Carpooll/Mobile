// structure of the screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"
import Layout from "./Layout"
import Login from '../Login/Login'
import EditProfileDriver from '../Edit/EditProfileDriver'
const Stack = createStackNavigator()

const BadgesStack = () =>{
    return(
        <Stack.Navigator
            screenOptions={{
            }}>
            <Stack.Screen 
                name="Welcome"
                component={EditProfileDriver}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}

export default BadgesStack;