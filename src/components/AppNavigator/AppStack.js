import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from "./TabNavigator.js"
import Layout from "../Layout/Layout"
import Colors from "../../res/Colors"

// Tests here, erase later
import Landing from "../test/Landing"
import Page from "../test/Page"

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
            {/* Add the rest of the screens here once they are ready */}
            <Stack.Screen name="Landing" component={Landing}/>
            <Stack.Screen name="TabNavigator" component={TabNavigator}/>
            <Stack.Screen name="Page" component={Page}/>
        </Stack.Navigator>
    );
}

export default AppStack