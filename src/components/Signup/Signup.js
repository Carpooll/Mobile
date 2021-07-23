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
  Alert
} from 'react-native';
import Fonts from '../../res/Fonts';

import UserSession from '../../Libs/Sessions';
import * as vars from '../Signup/SignupSelection';

const createTwoButtonAlert = () =>
    Alert.alert(
      "Important",
      "We sent you an email, please check it to verify your account.",
      [
        { text: "OK" }
      ]
    );

class SignUpData extends React.Component {
  state = {
    errors: [],
    user: undefined,
    form: {},
  };

  

  handleSubmit = async () => {
    try {
      this.setState({loading: true, user: undefined});
      let response = await UserSession.instance.signup(this.state.form);

      if (typeof response == 'object') {
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
        }
        this.setState({loading: false, user: undefined, errors: errors});
      } else {
        this.setState({
          loading: false,
          user: response,
          errors: [],
        });
        if (this.state.user) {
          createTwoButtonAlert()
          console.log(vars.is_driver);
          this.props.navigation.navigate('Login');
          
        }
      }
    } catch (err) {
      console.log('Sign up err', err);
      throw Error(err);
    }
  };

  render() {
    const {errors} = this.state;

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
  FormContainer: {
    marginTop: 45,
    height: FormHeight,
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
    color: Colors.white,
  },
});

export default SignUpData;
