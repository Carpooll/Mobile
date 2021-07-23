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
  Dimensions,
} from 'react-native';
import Fonts from '../../res/Fonts';
import UserSession from '../../Libs/Sessions';

// import Background from "../../assets/background.jpeg"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Background = {
  uri: `https://images.pexels.com/photos/3876465/pexels-photo-3876465.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`,
};
class Login extends React.Component {
  state = {
    error: null,
    user: undefined,
    form: {},
  };

  handlePress = () => {
    //this.props.navigation.navigate('SignUpData');
    this.props.navigation.navigate('Selection');
  };

  handleSubmit = async () => {
    try {
      this.setState({error: null, user: undefined});
      let response = await UserSession.instance.login(this.state.form);

      if (typeof response == 'object') {
        //console.log(response);
        if (response['405']) {
          var message = 'Your account is not verified';
        } else {
          var message = 'Invalid username or password, try again';
        }
        this.setState({error: message, user: undefined});
      } else {
        this.setState({error: null, user: response});
      }
    } catch (err) {
      this.setState({error: err});
    }
    if (this.state.user) {
      //poner la verificacion de si los campos son null o no 
      this.props.navigation.replace('SignUpAdrress');
      console.log("You're logged in");
    }
  };

  render() {
    const {error} = this.state;
    return (
      <ScrollView style={styles.container}>
        <View>
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
                <Text style={styles.errorText}>
                  {error ? (
                    <View>
                      <Text style={styles.error}>{error}</Text>
                    </View>
                  ) : null}
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.form}
                    placeholder="Student ID"
                    placeholderTextColor={Colors.black}
                    onChangeText={text => {
                      this.setState(prevState => {
                        let form = Object.assign({}, prevState.form);
                        form.username = text;
                        return {form};
                      });
                    }}
                  />
                  <TextInput
                    secureTextEntry={true}
                    style={styles.form}
                    placeholder="Password"
                    placeholderTextColor={Colors.black}
                    onChangeText={text => {
                      this.setState(prevState => {
                        let form = Object.assign({}, prevState.form);
                        form.password = text;
                        return {form};
                      });
                    }}
                  />
                </View>

                <TouchableOpacity
                  style={styles.buttonDark}
                  onPress={this.handleSubmit}>
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
    height: windowHeight,
    backgroundColor: Colors.white,
  },
  errorText: {
    marginTop: 60,
    
  },
  error:{
    color: '#FF0000',
    fontWeight: 'bold',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 200, // border borderRadius same as width and height
    overflow: 'hidden',
    marginTop: -150,
    paddingTop: 205,
    paddingBottom: 130,
    marginBottom: -75,

    // height: 100, // same width and height for the container
    // width: 200,
    // position: 'absolute', // position it in circle
    // bottom: 0, // position it in circle
    // marginLeft: 100,
  },

  logoContainer: {
    alignSelf: 'center',
    marginTop: -100,
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

  logo: {
    width: 105,
    height: 105,
    justifyContent: 'center',
    alignSelf: 'center',

    zIndex: 2,
  },

  layerColor: {
    flex: 2,

    justifyContent: 'center',

    alignItems: 'center',
  },

  title: {
    margin: 30,

    marginBottom: 120,

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

    height: 320,

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

    position: 'relative',
  },

  inputContainer: {
    paddingTop: 100,

    marginBottom: -30,
  },

  form: {
    paddingHorizontal: 20,
    color: Colors.black,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    marginBottom: 80,
    width: 150,
    textAlign: 'center',
    marginTop: -70,
  },

  signup: {
    display: 'flex',

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: 10,
    marginBottom: 50,
  },

  signupText: {
    marginTop: 80,

    color: Colors.black,
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

    marginTop: 295,

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

    paddingHorizontal: 25,

    color: Colors.white,
  },
});

export default Login;
