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

// NEEDS TO CHANGE TO DYNAMIC DATA

class HomeDriver extends React.Component {

    render(){
        return (
            <ScrollView style={Styles.Container}>
                <StatusBar backgroundColor="transparent" translucent={true}/>
                
                <View style={Styles.infoContainer}>   
                    <View style={Styles.imageContainer}>
                            <Image
                                style={Styles.image}
                                source={{
                                uri: 'https://images.unsplash.com/photo-1624759314986-43bee161a691?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMzfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                            }}/>
                    </View> 
                    <Text style={Styles.userName}>Brayan Prieto</Text>

                    <View style={Styles.buttons}>

                        <TouchableOpacity style={Styles.darkButton}>
                            <Text style={Styles.darkButtonText}>DELETE</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={Styles.blueButton}>
                            <Text style={Styles.blueButtonText}>SEE</Text>
                        </TouchableOpacity> */}

                    </View>
                </View>

            </ScrollView>
        )
    }
}

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width

var iconSize  =  height*.15
var borderTop = height*.10
var FormWidth = width*.80
var FormHeight = height*.70

const Styles = StyleSheet.create({
    Container: {
        backgroundColor:Colors.blue,
        position: 'relative',
        zIndex:0
    },
    infoContainer: {

        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',

        marginTop: height*0.08,
        height: 110,
        width: FormWidth,
        alignSelf: 'center',
        padding:'auto',

        backgroundColor:Colors.white,
        borderRadius: 15,
        position: 'relative',

    },
    image: {

        // alignSelf: 'center',
        height:iconSize,
        width:iconSize,
        borderRadius: iconSize/2,

    },
    imageContainer: {

        height:iconSize,
        width:iconSize,

        marginTop: height*0.02, //READY 
        marginLeft: height*0.02,//READY 
        
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
 
    userName: {
        display: 'flex',

        marginTop: height*0.03,
        marginLeft: height*0.20,

        color: Colors.button,
        fontSize: 20,
    },

    buttons:{
        width: 165,
        height: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },  

    darkButton:{

        alignSelf: 'flex-start',
        height: 20,
        width: 79,
        
        marginTop: 590, //590
        

        borderRadius: 15,

        fontSize:Fonts.miniButtons,
        backgroundColor: Colors.black,

        justifyContent: 'center',
    
        zIndex: 2,
    
        position: 'absolute',
    },

    darkButtonText:{

        alignSelf: 'center',
        color: Colors.white
    },

    blueButton:{

        alignSelf: 'center',
        height:FormHeight*.1,
        width:FormWidth*.6,

        marginTop: 590, //590
        marginLeft: 100,

        borderRadius: 15,

        fontSize:Fonts.miniButtons,
        backgroundColor: Colors.blue,

        justifyContent: 'center',
    
        zIndex: 5,
    
        position: 'absolute',
    },

    blueButtonText:{

        alignSelf: 'center',
        color: Colors.white
    }
})

export default HomeDriver