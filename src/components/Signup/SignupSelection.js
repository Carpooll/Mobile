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
                        <View>
                            <TouchableOpacity onPress={this.handlePassenger}>
                                <Text style={
                                    passenger
                                    ? Styles.selectedButton
                                    : Styles.unselectedButton
                                }>Passenger</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleDriver}>
                                <Text style={
                                    driver
                                    ? Styles.selectedButton
                                    : Styles.unselectedButton
                                }>Driver</Text>
                            </TouchableOpacity>
                        </View>
                    </View>                        
                </View>
                <TouchableOpacity style={Styles.darkButton} >
                    <Text style={Styles.darkButtonText}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={Styles.linkText}>
                            
                    </Text>
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
var FormHeight = height*.7
var DarkButton = FormHeight*.1
const Styles = StyleSheet.create({
    selectedButton:{
        color: Colors.black,
        marginTop:FormHeight*.12,
        backgroundColor:Colors.black,
        borderRadius:15,
        color:Colors.white,
        fontSize: 30,
        width:FormWidth*.70,
        textAlign: 'center',
    },
    unselectedButton: {
        color: Colors.black,
        marginTop:FormHeight*.12,
        borderBottomColor: Colors.black,
        borderBottomWidth: 1,
        fontSize: 30,
        width:FormWidth*.70,
        textAlign: 'center',
    },
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
    
        height:DarkButton,
        
        marginTop:((borderTop + iconSize/2)+(FormHeight-DarkButton/2)) ,
        
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
    },
    
})

export default Selection