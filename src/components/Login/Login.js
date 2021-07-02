import React from 'react';
import Colors from '../../res/Colors';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Fonts from '../../res/Fonts';
// import Background from "../../assets/background.jpeg"

const Background = {
  uri: `https://images.pexels.com/photos/3876465/pexels-photo-3876465.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`,
};
class Login extends React.Component {
  render() {
    return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />

       

        <ImageBackground source={Background} style={styles.image}>
          <View style={styles.layerColor}>
            <Text style={styles.title}>Welcome</Text>

            <View>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={{
                      uri: 'https://image.flaticon.com/icons/png/512/3448/3448650.png',
                    }}></Image>
              </View>
            </View>

            <View style={styles.login}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.form}
                  placeholder="Student ID"
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
                secureTextEntry={true}
                style={styles.form}
                placeholder="Password"
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

              <TouchableOpacity
                style={styles.buttonDark}
                onPress={this.handlePress}>
                <Text style={styles.buttonDarkText}>LOGIN</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ImageBackground>
            <View style={styles.signup}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity
                style={styles.buttonLight}
                onPress={this.handlePress}>
                <Text style={styles.buttonLightText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        flexDirection: 'column',

    justifyContent: 'center',

    backgroundColor: Colors.white,
  
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    overflow: 'hidden', 
    paddingBottom: '42%',
  
    // height: 100, // same width and height for the container
    // width: 200,
    // position: 'absolute', // position it in circle
    // bottom: 0, // position it in circle
    // marginLeft: 100,
  },

  logoContainer: {
    alignSelf:'center',
    
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
    borderRadius: 90,
    position: 'absolute',

    zIndex: 2,
  },

  logo: {
    width: 105,
    height: 105,
    justifyContent: 'center',
    alignSelf: 'center',

    zIndex: 4,
  },

  layerColor: {
    flex: 2,
    alignItems: 'center',
  },

  title: {
    margin: '15%',

    marginBottom: '30%',

    fontSize: 80,

    fontWeight: 'bold',

    color: Colors.white,

    fontSize: Fonts.mainTitle,

    color: Colors.white,
  },

  login: {
    shadowColor: '#000',
    
    shadowOffset: {
      width: 0,
      height: 5,
    },

    marginTop: '-20%',
    height: '80%',    

    shadowOpacity: 0.36,

    shadowRadius: 6.68,

    elevation: 11,

    backgroundColor: Colors.white,

    width: '75%',

    borderRadius: 15,

    display: 'flex',

    // justifyContent: 'center',

    alignItems: 'center',

    zIndex: 1,

    position: 'relative',
  },

  inputContainer: {

    marginTop: '18%',
  },

  form: {
    color: Colors.black,

    borderBottomColor: Colors.black,

    borderBottomWidth: 1,

    marginBottom: '6%',

    width: 150,

    textAlign: 'center',
  },

  signup: {
    display: 'flex',

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: '5%',
  },

  signupText: {
    marginTop: 80,

    color: Colors.black,
  },

  buttonLight: {
    width: '50%',

    padding: '3%',

    marginTop: '3%',

    borderRadius: 15,

    backgroundColor: Colors.white,

    borderColor: Colors.black,

    borderWidth: 2.5,
  },

  buttonLightText: {
    textAlign: 'center',

    fontSize: 18,

    fontWeight: 'bold',

    color: Colors.black,
  },
  buttonDark: {
    width: '60%',
    height: '0%',
    marginTop: '75%',

    // marginBottom: 0,

    borderRadius: 15,

    backgroundColor: Colors.black,

    borderColor: Colors.black,

    borderWidth: 1,

    justifyContent: 'center',

    zIndex: 5,

    position: 'absolute',
  },

  buttonDarkText: {
    textAlign: 'center',

    fontSize: 18,

    fontWeight: 'bold',

    color: Colors.white,
  },
});

export default Login;
