import React from 'react'
import {
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
  } from 'react-native';
import Fonts from '../../res/Fonts'
import Colors from '../../res/Colors';

class Selection extends React.Component {
    state = {
        driver:false,
        passenger:false,
    }
    handlePassenger = () =>{
        if (this.state.passenger == true){
            this.setState({passenger:false})
        }else{
            this.setState({passenger:true, driver:false})
        }
        
    }
    handleDriver = () =>{
        if (this.state.driver == true){
            this.setState({driver:false})
        }else{
            this.setState({passenger:false, driver:true})
        }
    }
    render(){
        const {driver, passenger} = this.state
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
                        <Text style={Styles.title}>Choose one option</Text>
                        <View style={Styles.Divisor}/>
                        <TouchableOpacity onPress={this.handlePassenger}>
                            <Text style={
                                passenger
                                ? Styles.selectedButton
                                : Styles.unselectedButton
                            }>Passenger</Text>
                        </TouchableOpacity>
                        <View style={Styles.Divisor}/>
                        <TouchableOpacity onPress={this.handleDriver}>
                            <Text style={
                                driver
                                ? Styles.selectedButton
                                : Styles.unselectedButton
                            }>Driver</Text>
                        </TouchableOpacity>
                    </View>                      
                </View>
                <TouchableOpacity style={Styles.darkButton} >
                    <Text style={Styles.darkButtonText}>Continue</Text>
                </TouchableOpacity>  
            </ScrollView>
        )
    }
}
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width
var iconSize  =  height*.15
var borderTop = height*.15
var FormWidth = width*.80
var FormHeight = height*.70
var DarkButton = FormHeight*.1
const Styles = StyleSheet.create({
    selectedButton:{
        color: Colors.black,
        backgroundColor:Colors.black,
        borderRadius:15,
        color:Colors.white,
        fontSize: 30,
        width:FormWidth*.70,
        textAlign: 'center',
    },
    unselectedButton: {
        color: Colors.black,
        borderBottomColor: Colors.black,
        borderBottomWidth: 1,
        fontSize: 30,
        width:FormWidth*.70,
        textAlign: 'center',
    },
    Divisor:{
        height:FormHeight*.15
    },
    
    Container: {
        backgroundColor:Colors.blue,
        position: 'relative',
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
    inputContainer:{
        alignItems: 'center',
        marginTop:20,
    },
    darkButton:{
        alignSelf: 'center',
        height:DarkButton,
        width:FormWidth*.6,
        marginTop:-(DarkButton/2),
        borderRadius: 15,
        fontSize:Fonts.miniButtons,
        backgroundColor: Colors.black,
        justifyContent: 'center',
        zIndex: 5,
        position: 'relative',
    },
    darkButtonText:{
        alignSelf: 'center',
        color: Colors.white,
        fontSize: Fonts.button,
        position: 'absolute'
    },
})

export default Selection