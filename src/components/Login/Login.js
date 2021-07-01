import React from 'react'
import Colors from '../../res/Colors'
import { Text, View, StatusBar, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Image } from 'react-native'
import Fonts from "../../res/Fonts"
// import Background from "../../assets/background.jpeg"

const Background = {

    uri: `https://images.pexels.com/photos/3876465/pexels-photo-3876465.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`,

};
class Login extends React.Component {

    render() {
        return (

            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} />

                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={{ uri: 'https://image.flaticon.com/icons/png/512/3448/3448650.png' }}></Image>
                </View>

                <ImageBackground source={Background} style={styles.image}>

                    <View style={styles.layerColor}>
                        <Text style={styles.title}>Welcome
                        </Text>

                        <View style={styles.login}>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.form}
                                    placeholder='Student ID'
                                    placeholderTextColor={Colors.black}
                                // onChangeText={text => { esq no sabemos si se usa unu
                                //     this.setState(prevState =>{
                                //         let form = Object.assign({}, prevState.form);
                                //         form.name = text;
                                //         return {form};
                                //     })
                                // }}
                                />
                                <TextInput
                                    style={styles.form}
                                    placeholder='Password'
                                    placeholderTextColor={Colors.black}
                                // onChangeText={text => {
                                //     this.setState(prevState =>{
                                //         let form = Object.assign({}, prevState.form);
                                //         form.name = text;
                                //         return {form};
                                //     })
                                // }}
                                />
                            </View>

                            <TouchableOpacity style={styles.buttonDark} onPress={this.handlePress}>

                                <Text style={styles.buttonDarkText}>LOGIN</Text>

                            </TouchableOpacity>
                        </View>

                        <View style={styles.signup}>
                            <Text style={styles.signupText}>Don't have an account?</Text>
                            <TouchableOpacity style={styles.buttonLight} onPress={this.handlePress}>

                                <Text style={styles.buttonLightText}>SIGN UP</Text>

                            </TouchableOpacity>
                        </View>
                    </View>

                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,

        flexDirection: "column",

        justifyContent: "center",

    },

    image: {

        flex: 1,

        resizeMode: 'cover',

        justifyContent: 'center',

    },

    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        marginLeft: 30,
        marginTop: 45,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        backgroundColor: Colors.white,
        width: 110,
        height: 110,
        resizeMode: 'cover',
        borderRadius: 100,
        position: 'absolute',
        top: 25,
        left: '28%',
        zIndex: 2,
    },
    
    logo: {
        
        width: 105,
        height: 105,

        zIndex: 2,
       
    },


    layerColor: {

        flex: 2,

        justifyContent: 'center',

        alignItems: 'center',

    },

    title: {

        margin: 30,

        marginBottom: 60,

        fontSize: 80,

        fontWeight: 'bold',

        color: Colors.white,

        fontSize: Fonts.mainTitle,

        color: Colors.white

    },

    login: {

        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 5,
        },

        height: 250,

        marginTop: -30,

        shadowOpacity: 0.36,

        shadowRadius: 6.68,

        elevation: 11,

        backgroundColor: Colors.white,

        width: 261,

        borderRadius: 15,

        display: 'flex',

        // justifyContent: 'center',

        alignItems: 'center',

        zIndex: 1,

        position: 'relative'

    },

    inputContainer: {

        paddingTop: 40,

        marginBottom: -30
    },

    form: {

        paddingHorizontal: 20,

        color: Colors.black,

        borderBottomColor: Colors.black,

        borderBottomWidth: 1,

        marginBottom: 30,

        width: 150,

        textAlign: 'center',

    },

    signup: {

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center'
    },


    signupText: {
        marginTop: 80,

        color: Colors.white
    },

    buttonLight: {

        width: 193,

        padding: 15,

        marginTop: 10,

        borderRadius: 15,

        backgroundColor: Colors.white,

        borderColor: Colors.black,

        borderWidth: 2.5,

    },

    buttonLightText: {

        textAlign: 'center',

        fontSize: 18,

        fontWeight: 'bold',

        paddingHorizontal: 25,

        color: Colors.black,

    },
    buttonDark: {

        width: 193,

        padding: 15,

        marginTop: 220,

        // marginBottom: 0,

        borderRadius: 15,

        backgroundColor: Colors.black,

        borderColor: Colors.black,

        borderWidth: 1,

        justifyContent: 'center',

        zIndex: 5,

        position: 'absolute'
    },

    buttonDarkText: {

        textAlign: 'center',

        fontSize: 18,

        fontWeight: 'bold',

        paddingHorizontal: 25,

        color: Colors.white,

    },

})

export default Login