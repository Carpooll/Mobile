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
                    <Text style={Styles.title}> Welcome</Text>
                    <View style={Styles.inputContainer}>
                        <TextInput style={Styles.input}  placeholder="Street" placeholderTextColor={Colors.black}/>
                        <TextInput style={Styles.input} placeholder='Suburbal' placeholderTextColor={Colors.black}/>
                        <TextInput style={Styles.input} placeholder='Postal Code' placeholderTextColor={Colors.black}/>
                        <TextInput style={Styles.input} placeholder='Internal Number' placeholderTextColor={Colors.black}/>
                        <TextInput style={Styles.input} placeholder='External Number' placeholderTextColor={Colors.black}/>
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
var iconSize  =  height*.20
var borderTop = height*.10
var FormWidth = width*.80
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
        marginTop: borderTop,
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

        marginTop:iconSize/2,

        alignSelf: 'center',

        fontSize: 80,
    
        fontWeight: 'bold',
    
        color: Colors.blue,
    
        fontSize: Fonts.mainTitle,
      },
    input: {

        color: Colors.black,
    
        borderBottomColor: Colors.black,
    
        borderBottomWidth: 1,
        
        paddingBottom: 0,

        marginBottom: 15,

        width: '80%',
    
        textAlign: 'left',
    },
    inputContainer:{
        alignItems: 'center',
        marginTop:20,
    },
    darkButton:{
        alignSelf: 'center',
    
        height:FormHeight*.1,
        
        marginTop:(borderTop + iconSize/2)+FormHeight*.95 ,
        
        width:FormWidth*.6,

        borderRadius: 15,
    
        backgroundColor: Colors.black,

        color: Colors.white,

        justifyContent: 'center',
    
        zIndex: 5,
    
        position: 'absolute',
    },
    darkButtonText:{
        color: Colors.white
    }
})

export default SignUpAdrress