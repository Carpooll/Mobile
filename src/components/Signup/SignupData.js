import React from 'react'
import {
    Text,
    View,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
    Dimensions,
  } from 'react-native';
import Fonts from '../../res/Fonts'
import Colors from '../../res/Colors';

class SignUpAdrress extends React.Component {

    render(){
        return (
            <ScrollView style={Styles.Container}>
                <StatusBar backgroundColor="transparent" translucent={true}/>
                <View style={Styles.logoContainer}>
                        <Image
                            style={Styles.logo}
                            source={{
                            uri: 'https://image.flaticon.com/icons/png/512/3448/3448650.png',
                        }}/>
                </View> 
                <View style={Styles.FormContainer}>   
                    <Text style={Styles.title}>Personal data</Text>
                    <View style={Styles.inputContainer}>
                        <TextInput style={Styles.input} placeholder="Student ID" placeholderTextColor={Colors.black}/>
                        <TextInput style={Styles.input} placeholder='Name' placeholderTextColor={Colors.black}/>
                        <TextInput style={Styles.input} placeholder='Last name' placeholderTextColor={Colors.black}/>
                        <TextInput style={Styles.input} placeholder='Phone number' placeholderTextColor={Colors.black}/>
                        <TextInput style={Styles.input} placeholder='Password' placeholderTextColor={Colors.black}/>
                        <TextInput style={Styles.input} placeholder='Password confirmation' placeholderTextColor={Colors.black}/>
                    </View>
                </View>
                <TouchableOpacity style={Styles.darkButton}>
                    <Text style={Styles.darkButtonText}>NEXT</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width
var iconSize  =  height*.15
var borderTop = height*.10
var FormWidth = width*.69
var FormHeight = height*.70
const Styles = StyleSheet.create({
    Container: {
        backgroundColor:Colors.blue,
        position: 'relative',
        zIndex:0
    },
    FormContainer: {

        marginTop:borderTop + iconSize/2,
        height:FormHeight,
        width: FormWidth,
        alignSelf: 'center',
        padding:'auto',
        backgroundColor:Colors.white,
        borderRadius:15,
        position: 'relative',
        marginBottom: height*.9-(borderTop + FormHeight)
    },
    logo: {
        alignSelf: 'center',
        height:iconSize,
        width:iconSize,

    },
    logoContainer: {
        marginTop: 75,
        alignSelf: 'center',
        height:iconSize,
        width:iconSize,
        backgroundColor:Colors.white,
        position: 'absolute',
        borderRadius: iconSize/2,
        zIndex:2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 20,
    },
    title:{

        marginTop:70,

        alignSelf: 'center',

        fontSize: Fonts.button,
    
        color: Colors.blue,


      },
    input: {

        color: Colors.black,
    
        borderBottomColor: Colors.black,
    
        borderBottomWidth: 1,

        fontSize: Fonts.text,
        
        paddingBottom: 0,

        marginBottom: 25,

        width: '65%',
    
        textAlign: 'center',
    },
    inputContainer:{
        alignItems: 'center',
        marginTop:20,
    },
    darkButton:{
        alignSelf: 'center',
    
        height:FormHeight*.1,
        
        marginTop:FormHeight+110,
        
        width: 193,

        borderRadius: 15,

        fontSize:Fonts.miniButtons,

        backgroundColor: Colors.black,

        justifyContent: 'center',
    
        zIndex: 5,
    
        position: 'absolute',
    },
    darkButtonText:{
        alignSelf: 'center',
        color: Colors.white
    }
})

export default SignUpAdrress