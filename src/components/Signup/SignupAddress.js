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

    handlePress = () => {
        this.props.navigation.replace('SignupPayment')
    };

    render() {
        return (
            <ScrollView style={Styles.Container}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <View style={Styles.logoContainer}>
                    <Image
                        style={Styles.logo}
                        source={{
                            uri: 'https://image.flaticon.com/icons/png/512/3448/3448650.png',
                        }} />
                </View>
                <View style={Styles.FormContainer}>
                    <Text style={Styles.title}>Address</Text>
                    <View style={Styles.inputContainer}>
                        <TextInput style={Styles.input} placeholder="Street" placeholderTextColor={Colors.black} />
                        <TextInput style={Styles.input} placeholder='Suburbal' placeholderTextColor={Colors.black} />
                        <TextInput style={Styles.input} placeholder='Postal Code' placeholderTextColor={Colors.black} />
                        <TextInput style={Styles.input} placeholder='Internal Number' placeholderTextColor={Colors.black} />
                        <TextInput style={Styles.input} placeholder='External Number' placeholderTextColor={Colors.black} />
                    </View>
                </View>
                <TouchableOpacity style={Styles.darkButton} onPress={this.handlePress}>
                    <Text style={Styles.darkButtonText}>NEXT</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width
var iconSize = height * .15
var borderTop = height * .10
var FormWidth = width * .69
var FormHeight = height * .68
const Styles = StyleSheet.create({
    Container: {
        backgroundColor: Colors.blue,
        position: 'relative',
        zIndex: 0
    },
    FormContainer: {

        marginTop: borderTop + iconSize / 2,
        height: FormHeight,
        width: FormWidth,
        alignSelf: 'center',
        padding: 'auto',
        backgroundColor: Colors.white,
        borderRadius: 15,
        position: 'relative',
        marginBottom: height * .9 - (borderTop + FormHeight)
    },
    logo: {
        width: 105,
        height: 105,
        justifyContent: 'center',
        alignSelf: 'center',

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

        zIndex: 2,
    },
    title: {

        marginTop: 70,

        alignSelf: 'center',

        fontSize: Fonts.button,

        color: Colors.blue,


    },
    input: {

        color: Colors.black,

        borderBottomColor: Colors.black,

        borderBottomWidth: 1,

        fontSize: Fonts.text,

        paddingBottom: 8,

        marginBottom: 25,

        width: 180,

        textAlign: 'center',
    },
    inputContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    darkButton: {
        alignSelf: 'center',

        height: FormHeight * .1,

        marginTop: FormHeight + 110,

        width: 193,

        borderRadius: 15,

        fontSize: Fonts.miniButtons,

        backgroundColor: Colors.black,

        justifyContent: 'center',

        zIndex: 5,

        position: 'absolute',
    },
    darkButtonText: {
        alignSelf: 'center',
        color: Colors.white
    }
})

export default SignUpAdrress