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
                <View style={Styles.imageContainer}>
                        <Image
                            style={Styles.image}
                            source={{
                            uri: 'https://images.unsplash.com/photo-1624759314986-43bee161a691?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMzfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                        }}/>
                </View> 
                <View style={Styles.infoContainer}>   
                    <Text style={Styles.userName}>Brayan Prieto</Text>

                    <TouchableOpacity style={Styles.darkButton}>
                        <Text style={Styles.darkButtonText}>DELETE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.blueButton}>
                        <Text style={Styles.blueButtonText}>SEE</Text>
                    </TouchableOpacity>
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

})

export default HomeDriver