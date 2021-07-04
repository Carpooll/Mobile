/* Navbar */

// FOLLOWING: https://reactnavigation.org/docs/tab-based-navigation

import * as React from 'react';
import { 
    Text, 
    View, 
    StyleSheet 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

class Layout extends React.Component{

    render(){
        return(
            <Text style={styles.title}>Nabar</Text>
        )
    }

}

const styles = StyleSheet.create({
})

export default Layout