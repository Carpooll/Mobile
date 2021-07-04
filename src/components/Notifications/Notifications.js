import React from 'react'
import {
    Text,
    View,
    StatusBar,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    Pressable
  } from 'react-native';
import Fonts from '../../res/Fonts'
import Colors from '../../res/Colors';

// NEEDS TO CHANGE TO DYNAMIC DATA

class Notifications extends React.Component {

    render(){
        const {item} = this.props // check this
        return (
            <ScrollView style={Styles.Container}>
                <StatusBar backgroundColor="transparent" translucent={true}/>

                <View style={Styles.infoContainer}>

                    <View style={Styles.icon}>
                        <Pressable>
                            <Image
                                style={Styles.erase}
                                source={require('../../assets/erase.png')}
                            />
                        </Pressable>
                    </View>
                    
                    <View style={Styles.text}>
                        <Text style={Styles.pop}>Neque porro quisquam est qui dolorem Neque porro quisquam est qui dolorem</Text>
                    </View>
                </View>
                    
            </ScrollView>
        )
    }
}

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width

var FormWidth = width*.80

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

        marginTop: height*0.02,
        height: 80,
        width: FormWidth,
        alignSelf: 'center',
        padding: 0,

        backgroundColor:Colors.blue,

        borderColor: Colors.blue,
        borderBottomColor: Colors.white,
        borderWidth: 1,

    },

    text: {

        position: 'absolute',

        marginBottom: height*0.5,
        
        paddingLeft: width*0.008, //3
        paddingTop: height*0.005, //5
        paddingRight: width*0.1 //25
    },
    
    pop: {
        fontSize: 14,

        color: Colors.white
    },  

    icon:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        margin: 0,
    },

    erase:{
        height: 22,
        width: 22,

        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'flex-end',

        marginLeft: width*0.7, //250
        marginBottom: height*0.001, //40
        
    },  
})

export default Notifications