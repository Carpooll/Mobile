import React from 'react';
import Colors from '../../res/Colors';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import Fonts from '../../res/Fonts';

import UserSession from '../../Libs/Sessions';
import * as vars from '../Signup/SignupSelection';

const createTwoButtonAlert = () =>
  Alert.alert(
    'Important',
    'We sent you an email, please check it to verify your account.',
    [{text: 'OK'}],
  );

export var is_driver = 0;

class SignUpData extends React.Component {
  state = {
    errors: [],
    user: undefined,
    driver: false,
    passenger: false,
    form: {},
  };

  handlePassenger = () => {
    if (this.state.passenger == true) {
      this.setState({passenger: false});
    } else {
      this.setState({passenger: true, driver: false});
      console.log('passenger');
      is_driver = 0;
      this.setState(prevState => {
        let form = Object.assign({}, prevState.form);
        form.is_driver = is_driver;
        return {form};
      });
    }
  };

  handleDriver = () => {
    if (this.state.driver == true) {
      this.setState({driver: false});
    } else {
      this.setState({passenger: false, driver: true});
      console.log('driver');
      is_driver = 1;
      this.setState(prevState => {
        let form = Object.assign({}, prevState.form);
        form.is_driver = is_driver;
        return {form};
      });
    }
  };

  handleSubmit = async () => {
    try {
      this.setState({user: undefined});
      //console.log(this.state.form);
      
       var response = await UserSession.instance.signup(this.state.form);
 
        // response == 'object'
        //console.log(response)
      if (response.email != null || response.is_driver != null ||response.password != null || response.password_confirmation != null || response.username != null || response.Error != null ) {
        
        //console.log(response)
        let errors = [];
        let cont = 0;

        for (let error in response) {
          let key = error;
          if (error == 'non_field_errors') {
            error = 'password';
          }

          errors.push(
            <View key={cont}>
              <Text>{`${error} : ${response[key][0]}`}</Text>
            </View>,
          );
          cont++;
          this.setState({user: undefined, errors: errors});
        }
        console.log(errors)
        
        
      }else{
        this.setState({
          user: response,
          errors: [],
        });
        createTwoButtonAlert();
          this.props.navigation.navigate('Login');
      }
      
    } catch (err) {
      console.log('Sign up err', err);
      throw Error(err);
    }
  };

  render() {
    const {errors, passenger, driver} = this.state;

    return (
      <ScrollView style={Styles.Container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={Styles.layerColor}>
          <View style={Styles.logoContainer}>
            <Image
              style={Styles.logo}
              source={{
                uri: 'https://image.flaticon.com/icons/png/512/3448/3448650.png',
              }}
            />
          </View>
          <View style={Styles.errorForm}>
            <Text style={Styles.title}>Signup</Text>
          </View>

          <View style={Styles.FormContainer}>
            <Text style={Styles.title}>Personal data</Text>

            <View style={Styles.inputContainer}>
              <TextInput
                style={Styles.input}
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
                style={Styles.input}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor={Colors.black}
                onChangeText={text => {
                  this.setState(prevState => {
                    let form = Object.assign({}, prevState.form);
                    form.email = text;
                    return {form};
                  });
                }}
              />
              <TextInput
                secureTextEntry={true}
                style={Styles.input}
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
              <TextInput
                secureTextEntry={true}
                style={Styles.input}
                placeholder="Password confirmation"
                placeholderTextColor={Colors.black}
                onChangeText={text => {
                  this.setState(prevState => {
                    let form = Object.assign({}, prevState.form);
                    form.password_confirmation = text;
                    return {form};
                  });
                }}
              />

              <Text style={Styles.title2}>Choose one option</Text>
              <TouchableOpacity onPress={this.handlePassenger}>
                <Text
                  style={
                    passenger ? Styles.selectedButton : Styles.unselectedButton
                  }>
                  Passenger
                </Text>
              </TouchableOpacity>
              <View style={Styles.Divisor} />
              <TouchableOpacity onPress={this.handleDriver}>
                <Text
                  style={
                    driver ? Styles.selectedButton2 : Styles.unselectedButton2
                  }>
                  Driver
                </Text>
              </TouchableOpacity>
            </View>
            {errors ? <View style={Styles.error}>{errors}</View> : null}
          </View>
          <TouchableOpacity
            style={Styles.darkButton}
            onPress={this.handleSubmit}>
            <Text style={Styles.darkButtonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var iconSize = height * 0.15;
var borderTop = height * 0.1;
var FormWidth = width * 0.69;
var FormHeight = height * 0.76;

const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.blue,
    position: 'relative',
    zIndex: 0,
  },
  title2: {
    marginTop: -5,
    marginBottom: 15,

    alignSelf: 'center',

    fontSize: Fonts.button,

    color: Colors.blue,
  },

  selectedButton: {
    color: Colors.black,
    backgroundColor: Colors.blue,
    borderRadius: 10,
    color: Colors.white,
    fontSize: 26,
    paddingTop: 10,
    paddingBottom: 10,
    width: FormWidth * 0.7,
    textAlign: 'center',
    shadowColor: '#000',
    fontSize: Fonts.button,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  selectedButton2: {
    color: Colors.black,
    backgroundColor: Colors.blue,
    borderRadius: 10,
    color: Colors.white,
    fontSize: 26,
    paddingTop: 10,
    paddingBottom: 10,
    width: FormWidth * 0.7,
    textAlign: 'center',
    shadowColor: '#000',
    fontSize: Fonts.button,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  Divisor: {
    height: FormHeight * 0.15,
  },

  unselectedButton: {
    color: Colors.black,
    borderColor: Colors.black,
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    width: FormWidth * 0.65,
    textAlign: 'center',
    fontSize: Fonts.button,
    borderRadius: 10,
  },
  unselectedButton2: {
    color: Colors.black,
    borderColor: Colors.black,
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    width: FormWidth * 0.65,
    textAlign: 'center',
    fontSize: Fonts.button,
    borderRadius: 10,
  },

  FormContainer: {
    marginTop: 45,
    height: FormHeight + 80,
    width: FormWidth,
    alignSelf: 'center',
    padding: 'auto',
    backgroundColor: Colors.white,
    borderRadius: 15,
    position: 'relative',
    marginBottom: height * 0.9 - (borderTop + FormHeight),
  },

  error: {
    textAlign: 'justify',
    marginLeft: 50,
    color: '#FF0000',
    fontWeight: 'bold',
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

    height: FormHeight * 0.1,

    marginTop: FormHeight + 190,

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
    color: Colors.white,
  },
});

export default SignUpData;
