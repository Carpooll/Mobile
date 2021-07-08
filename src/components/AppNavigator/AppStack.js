import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from "./TabNavigator.js"
import Layout from "../Layout/Layout"
import Colors from "../../res/Colors"

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
            }}
        >
            <Stack.Screen 
                name="Landing" 
                component={Layout}
                options={{headerShown:false}}
            />
            {/* v Add here the rest of the screens once they are ready v */}
            <Stack.Screen name="BadgesTabNavigator" component={TabNavigator}/>
        </Stack.Navigator>
    );
}

export default AppStack