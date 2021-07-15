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

class ProfileDriver extends React.Component {

    render(){
        return (
            <ScrollView style={Styles.Container}>
                <StatusBar backgroundColor="transparent" translucent={true}/>
                <View style={Styles.imageContainer}>
                        <Image
                            style={Styles.image}
                            source={{
                            uri: 'https://images.unsplash.com/photo-1624759314986-43bee161a691?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMzfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                        }}/>
                </View> 
                <View style={Styles.infoContainer}>   
                        <Text style={Styles.userName}>Brayan Prieto</Text>
                        <Text style={Styles.userInfo}>35416654231</Text>
                        <Text style={Styles.userInfo}>614-522-88-99</Text>

                        <Text style={Styles.userTitle}>Car Info</Text>
                        <Text style={Styles.userInfo}>Mercedez</Text>
                        <Text style={Styles.userInfo}>Black</Text>

                        <Text style={Styles.userTitle}>Your Profits</Text>
                        <View style={Styles.profitContainer}>
                            <Text style={Styles.userInfo}>$ 350.00</Text>
                        </View>
                        <Text style={Styles.profitTime}>This Week</Text>

                        <Text style={Styles.userTitle}>Your Location</Text>
                        <View style={Styles.mapContainer}>
                            <Image
                                style={Styles.mapContainer}
                                source={{
                                uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.wired.com%2Fphotos%2F5a6a61938c669c70314b300d%2F191%3A100%2Fpass%2FGoogle-Map-US_10.jpg&f=1&nofb=1',
                            }}/>
                        </View>
                </View>
                <TouchableOpacity style={Styles.darkButton}>
                    <Text style={Styles.darkButtonText}>EDIT</Text>
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
var FormHeight = height*.7

const Styles = StyleSheet.create({
    Container: {
        backgroundColor:Colors.blue,
        position: 'relative',
        zIndex:0
    },
    infoContainer: {

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 140,
        height: height*.7,
        width: FormWidth,
        alignSelf: 'center',
        padding:'auto',

        backgroundColor:Colors.white,
        borderRadius: 15,
        position: 'relative',

    },
    image: {
        alignSelf: 'center',
        height:iconSize,
        width:iconSize,
        borderRadius: iconSize/2,

    },
    imageContainer: {
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
 
    userName: {
        display: 'flex',
        marginTop: 0,
        color: Colors.black,
        fontSize: 20,
    },

    userInfo: {
        color: Colors.black,
        fontSize: Fonts.miniButtons,
    },

    userTitle: {
        marginBottom:5,
        color: Colors.blue,
        fontSize: Fonts.button,

        marginTop: 20,
    },

    profitContainer:{
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        width: 94,
        height: 44,

        backgroundColor: Colors.white,

        borderColor: '#F1F1F1',
        borderWidth: 2,
        borderRadius: 7,
        zIndex:2,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 0,
        },
        shadowOpacity: 0.35,
        shadowRadius: 6,
        
        elevation: 10,
    },

    profitTime:{
        paddingTop:5,
        fontSize: 10,
        color: '#A4A4A4',
    },

    mapContainer:{
        height: 90,
        width: 100,
        borderRadius: 7,
        zIndex:2,

        backgroundColor: Colors.blue
    },

    darkButton:{

        alignSelf: 'center',
        height:FormHeight*.1,
        marginTop: -25, //590
        width:FormWidth*.6,

        borderRadius: 15,

        fontSize:Fonts.miniButtons,
        backgroundColor: Colors.black,

        justifyContent: 'center',
    
        zIndex: 10,
    },

    darkButtonText:{

        alignSelf: 'center',
        color: Colors.white
    }
})

export default ProfileDriver
