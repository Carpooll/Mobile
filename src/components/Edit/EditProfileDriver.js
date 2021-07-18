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

class EditProfileDriver extends React.Component {

    handlePress = () =>{
        this.props.navigation.navigate('ProfileDriver')
    }

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
                    <View style={Styles.inputContainer}>
                        <Text style={Styles.subtitle}>Personal data</Text>
                        <TextInput style={Styles.input} placeholder='Cellphone' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Cellphone</Text>

                        <Text style={Styles.subtitle}>Address</Text>
                        <TextInput style={Styles.input} placeholder='Street' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Street</Text>
                        <TextInput style={Styles.input} placeholder='Suburbal' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Suburbal</Text>
                        <TextInput style={Styles.input} placeholder='Internal Number' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Internal Number</Text>
                        <TextInput style={Styles.input} placeholder='External Number' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>External Number</Text>
                        <TextInput style={Styles.input} placeholder='Postal Code' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Postal code</Text>

                        <Text style={Styles.subtitle}>Payment</Text>
                        <TextInput style={Styles.input} placeholder='Name' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Name</Text>
                        <TextInput style={Styles.input} placeholder='Card number' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Card number</Text>
                        <TextInput style={Styles.input} placeholder='Expiration date' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Expiration date</Text>
                        <TextInput style={Styles.input} placeholder='CVV' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>CVV</Text>

                        <Text style={Styles.subtitle}>Car data</Text>
                        <TextInput style={Styles.input} placeholder='Color' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Color</Text>
                        <TextInput style={Styles.input} placeholder='Model' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Model</Text>
                        <TextInput style={Styles.input} placeholder='Insurance policy' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Insurance policy</Text>
                        <TextInput style={Styles.input} placeholder='Plates' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Plates</Text>
                    </View>
                </View>
                <TouchableOpacity style={Styles.darkButton} onPress={this.handlePress}>
                    <Text style={Styles.darkButtonText}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={Styles.linkText}>
                        Delete Account.
                    </Text>
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
var FormHeight = height*1.37
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
        backgroundColor:Colors.white,
        borderRadius:15,
        position: 'relative',

    },
    logo: {
        alignSelf: 'center',
        width: 105,
        height: 105,

    },
    logoContainer: {
        alignSelf: 'center',
        marginTop: 80,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.0,
        elevation: 20,
    
        backgroundColor: Colors.white,
    
        width: 110,
        height: 110,
        resizeMode: 'cover',
        borderRadius: 90,
        position: 'absolute',
    

    },
    title:{

        marginTop:iconSize/2,

        alignSelf: 'center',

        fontSize: Fonts.mainTitle,
    
        color: Colors.blue,

      },
    subtitle: {

        marginTop:FormHeight*.035,

        alignSelf: 'center',

        fontSize: Fonts.subTitle,

        fontSize: Fonts.mainTitle,
    
        color: Colors.blue,
    
        fontSize: Fonts.subTitle,
    },
    input: {

        color: Colors.black,
    
        borderBottomColor: Colors.black,
    
        borderBottomWidth: 1,

        fontSize: Fonts.text,
        
        paddingBottom: 0,

        width: 180,
    
        textAlign: 'center',
    },
    inputContainer:{
        alignItems: 'center',
        marginTop:20,
    },
    darkButton:{
        alignSelf: 'center',
    
        height:FormHeight*.05,
        
        marginTop:((borderTop + iconSize/2)+FormHeight*.975) ,
        
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
        color: Colors.white,
        fontSize: Fonts.button,
    },
    linkText:{
        alignSelf: 'center',
        color: Colors.white,
        fontSize: Fonts.text,
        marginTop: 60,
        paddingBottom: 50
        
    },
    grayText:{
        paddingTop:0,
        alignSelf: 'center',
        color:'#A4A4A4',
        fontSize:10,
    }
})

export default EditProfileDriver