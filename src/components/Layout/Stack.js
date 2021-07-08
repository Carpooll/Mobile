// structure of the screens

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../../res/Colors"
import Layout from "./Layout"

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
        </Stack.Navigator>
    );
}

export default BadgesStack;