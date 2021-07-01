/* Navbar */

import React from 'react'
import {StyleSheet, Text} from 'react-native'

class Layout extends React.Component{
    render(){
        return(
            <Text style={styles.title}>Hola</Text>
        )
    }

}

const styles = StyleSheet.create({

    title:{
        fontFamily: "comfortaa"
    }
    
})

export default Layout