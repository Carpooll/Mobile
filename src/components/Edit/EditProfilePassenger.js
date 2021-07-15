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

class EditProfilePassenger extends React.Component {

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
                        <Text style={Styles.subtitle}>Datos Personales</Text>
                        <TextInput style={Styles.input}>6140000000</TextInput>
                        <Text style={Styles.grayText}>Telefono</Text>

                        <Text style={Styles.subtitle}>Direccion</Text>
                        <TextInput style={Styles.input} placeholder='Street' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Calle</Text>
                        <TextInput style={Styles.input} placeholder='Suburbal' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Colonia</Text>
                        <TextInput style={Styles.input} placeholder='Internal Number' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Numero interno</Text>
                        <TextInput style={Styles.input} placeholder='External Number' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Numero Extrno</Text>
                        <TextInput style={Styles.input} placeholder='Postal Code' placeholderTextColor={Colors.black}></TextInput>
                        <Text style={Styles.grayText}>Codigo Postal</Text>

                        <Text style={Styles.subtitle}>Payment</Text>
                        <TextInput style={Styles.input} placeholder='name' placeholderTextColor={Colors.black}>Brayan Prieto</TextInput>
                        <Text style={Styles.grayText}>Nombre</Text>
                        <TextInput style={Styles.input} placeholder='card number' placeholderTextColor={Colors.black}>************1203</TextInput>
                        <Text style={Styles.grayText}>Numero De Tarjeta</Text>
                        <TextInput style={Styles.input} placeholder='Expiration date' placeholderTextColor={Colors.black}>11/22</TextInput>
                        <Text style={Styles.grayText}>Fecha de Expiracion</Text>
                        <TextInput style={Styles.input} placeholder='CVV' placeholderTextColor={Colors.black}>***</TextInput>
                        <Text style={Styles.grayText}>CVV</Text>
                    </View>
                </View>
                <TouchableOpacity style={Styles.darkButton}>
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
var borderTop = height*.12
var FormWidth = width*.80
var FormHeight = height*1.15
const Styles = StyleSheet.create({
    Container: {
        backgroundColor:Colors.blue,
        position: 'relative',
        zIndex:0
    },
    FormContainer: {

        marginTop:borderTop + iconSize/2,
        marginBottom:-height*.4,
        height:FormHeight,
        width: FormWidth,
        alignSelf: 'center',
        backgroundColor:Colors.white,
        borderRadius:15,
        position: 'relative',

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

        fontSize: Fonts.mainTitle,
    
        color: Colors.blue,

      },
    subtitle: {

        marginTop:FormHeight*.05,

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

        width: '50%',
    
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
        
        width:FormWidth*.6,

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
        marginTop:height*.45,
        paddingBottom:height*.02
        
    },
    grayText:{
        paddingTop:0,
        alignSelf: 'center',
        color:'#A4A4A4',
        fontSize:10,
    }
})

export default EditProfilePassenger