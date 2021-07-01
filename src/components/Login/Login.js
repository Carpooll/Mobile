import React from 'react'
import Colors from '../../res/Colors'
import { Text, View, StatusBar, StyleSheet, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
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
                            <Text>Don't have an account?</Text>
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
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {

        flex: 1,

        flexDirection: "column",

        justifyContent: "center",

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

    buttonLight: {

        width: 193,

        padding: 15,

        marginTop: 70,

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

    signup: {
        display: 'flex',
        justifyContent: 'center'
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
    form: {
        paddingHorizontal: 20,
        color: Colors.black,
        borderBottomColor: Colors.black,
        borderBottomWidth: 1,
        marginBottom: 30,
        width: 150,
        textAlign: 'center',

    },
    inputContainer: {
        paddingTop: 40,
        marginBottom: -30
    }
})

export default Login