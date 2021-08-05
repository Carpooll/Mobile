import React from 'react';
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
import Fonts from '../../res/Fonts';
import Colors from '../../res/Colors';
import * as vars from '../../Libs/Sessions';
import UserSession from '../../Libs/Sessions';

class SignUpAdrress extends React.Component {
  state = {
    errors: [],
    form: { 
      profile: {}
    },
    driver: vars.driver,
  };

  handleSubmit = async () => {
    const {driver} = this.state
    try {
      let response = await UserSession.instance.signupData(this.state.form);
      if(response){
        if(driver == true){
          this.props.navigation.navigate('SignupCar');
        }else if(driver == false){
          //createTwoButtonAlert()  
          this.props.navigation.navigate('PassengerHome');
        }
      }
    } catch (err) {
      console.log('Sign up err', err);
      throw Error(err);
    }
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
            }}
          />
        </View>
        <View style={Styles.FormContainer}>
          <Text style={Styles.title}>Personal Data</Text>
          <View style={Styles.inputContainer}>
            <TextInput
              style={Styles.input}
              placeholder="First name"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.first_name = text;
                  return {form};
                });
              }}
            />
            <TextInput
              style={Styles.input}
              placeholder="Last name"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.last_name = text;
                  return {form};
                });
              }}
            />
            <TextInput
              style={Styles.input}
              placeholder="Cellphone"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.profile.phone = text;
                  return {form};
                });
              }}
            />
          </View>
          <Text style={Styles.titleA}>Address</Text>
          <TouchableOpacity
            style={Styles.locationButton}
            onPress={this.handleSubmit}>
            <Text style={Styles.locationTitle}>Use my current location</Text>
          </TouchableOpacity>
          <View style={Styles.inputContainer}>
            <TextInput
              style={Styles.input}
              placeholder="Street"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.profile.street = text;
                  return {form};
                });
              }}
            />
            <TextInput
              style={Styles.input}
              placeholder="Suburbal"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.profile.suburb = text;
                  return {form};
                });
              }}
            />
            <TextInput
              style={Styles.input}
              placeholder="Postal Code"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.profile.postal_code = text;
                  return {form};
                });
              }}
            />
            <TextInput
              style={Styles.input}
              placeholder="Internal Number"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.profile.internal_number = text;
                  return {form};
                });
              }}
            />
            <TextInput
              style={Styles.input}
              placeholder="External Number"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.profile.external_number = text;
                  return {form};
                });
              }}
            />
          </View>
        </View>
        <TouchableOpacity style={Styles.darkButton} onPress={this.handleSubmit}>
          <Text style={Styles.darkButtonText}>NEXT</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var iconSize = height * 0.15;
var borderTop = height * 0.1;
var FormWidth = width * 0.69;
var FormHeight = height * 0.68;
const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.blue,
    position: 'relative',
    zIndex: 0,
  },
  FormContainer: {
    marginTop: borderTop + iconSize / 2,
    height: FormHeight + 450,
    width: FormWidth,
    alignSelf: 'center',
    padding: 'auto',
    backgroundColor: Colors.white,
    borderRadius: 15,
    position: 'relative',
    marginBottom: height * 0.9 - (borderTop + FormHeight),
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
  titleA: {
    marginTop: 20,

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

    marginTop: FormHeight + 500,

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
  locationTitle: {
    alignSelf: 'center',
    marginTop: 10,
    color: Colors.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.40)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  locationButton: {
    alignSelf: 'center',
    backgroundColor: '#8FBCCF',
    borderRadius: 10,
    width: 150,
    height: 40,
    marginTop: 20,
    elevation: 4,
    alignItems: 'center',
  },
});

export default SignUpAdrress;
