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
import ModalDelete from '../Generics/Modal';
import UserSession from '../../Libs/Sessions';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

Geocoder.init('AIzaSyAp0yzmKQT9t6pXXJ3xLHrxzedpOS-6hYg');
Geocoder.init('AIzaSyAp0yzmKQT9t6pXXJ3xLHrxzedpOS-6hYg', {language: 'es'});

var address = '';

class EditProfilePassenger extends React.Component {
  state = {
    form: {
      profile: {
        coordinate_y: null,
        coordinate_x: null,
      },
    },
    user: {
      address: null,
    },
    aux: {
      profile: {
        coordinate_y: null,
        coordinate_x: null,
      },
    },
  };

  handleSubmit = async () => {
    try {
      if (address != null) {
        this.handleLocation();
      } else {
        console.log(this.state.form);
        await UserSession.instance.signupData(this.state.form);
        this.props.navigation.replace('PassengerPrivate');
      }
    } catch (err) {
      console.log('Edit profile error', err);
      throw Error(err);
    }
  };

  handleLocation = async () => {
    const {user, form} = this.state;
    //console.log(Lat)
    //console.log(Lng)
    try {
      address = form.profile.street.concat(
        ' ',
        form.profile.external_number.concat(
          ' ',
          form.profile.suburb.concat(' ', form.profile.postal_code),
        ),
      );
      user.address = address;
      //console.log(address);

      Geolocation.getCurrentPosition(
        position => {
          Geocoder.from(user.address)
            .then(json => {
              let results = json.results[0];
              latitud = JSON.stringify(results.geometry.location.lat);
              //console.log(latitud)
              let lat = parseFloat(latitud);
              //console.log(Lat)
              form.profile.coordinate_x = lat;
              //console.log(form.profile.coordinate_x);
              longitud = JSON.stringify(results.geometry.location.lng);
              let lng = parseFloat(longitud);
              form.profile.coordinate_y = lng;
              //console.log(form.profile.coordinate_y);
              var aux = this.state.form;
              aux = {
                profile: {
                  coordinate_x: lat,
                  coordinate_y: lng,
                },
              };
              this.setState({aux: aux});
              console.log(this.state.aux);
              console.log('2');
              this.handleGetLocation();
            })
            .catch(error => console.warn(error));
        },
        error => {
          this.setState({
            error: error.message,
          }),
            console.log(error.code, error.message);
        },

        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 100000,
        },
      );
    } catch (err) {
      console.log('Sign up err', err);
      throw Error(err);
    }
  };

  handleGetLocation = async () => {
    console.log('3');
    const {aux, form} = this.state;
    let form2 = {
      profile: {
        phone: form.profile.phone,
        street: form.profile.street,
        suburb: form.profile.suburb,
        postal_code: form.profile.postal_code,
        internal_number: form.profile.internal_number,
        external_number: form.profile.external_number,
        coordinate_x: aux.profile.coordinate_x,
        coordinate_y: aux.profile.coordinate_y,
      },
    };
    console.log(form2);
    await UserSession.instance.signupData(form2);
    this.props.navigation.replace('PassengerPrivate');
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
          <View style={Styles.inputContainer}>
            <Text style={Styles.subtitle}>Personal Data</Text>

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
              }}></TextInput>
            <Text style={Styles.grayText}>Cellphone</Text>

            <Text style={Styles.subtitle}>Address</Text>

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
              }}></TextInput>
            <Text style={Styles.grayText}>Street</Text>

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
              }}></TextInput>
            <Text style={Styles.grayText}>Suburbal</Text>

            <TextInput
              style={Styles.input}
              placeholder="Internal Number"
              placeholderTextColor={Colors.black}
              keyboardType="numeric"
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.profile.internal_number = text;
                  return {form};
                });
              }}></TextInput>
            <Text style={Styles.grayText}>Internal Number</Text>

            <TextInput
              style={Styles.input}
              placeholder="External Number"
              placeholderTextColor={Colors.black}
              keyboardType="numeric"
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.profile.external_number = text;
                  return {form};
                });
              }}></TextInput>
            <Text style={Styles.grayText}>External Number</Text>

            <TextInput
              style={Styles.input}
              placeholder="Postal Code"
              placeholderTextColor={Colors.black}
              keyboardType="numeric"
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.profile.postal_code = text;
                  return {form};
                });
              }}></TextInput>

            <Text style={Styles.grayText}>Postal Code</Text>
          </View>
        </View>
        <TouchableOpacity style={Styles.darkButton} onPress={this.handleSubmit}>
          <Text style={Styles.darkButtonText}>SAVE</Text>
        </TouchableOpacity>

         <ModalDelete></ModalDelete> 
      </ScrollView>
    );
  }
}
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var iconSize = height * 0.15;
var borderTop = height * 0.1;
var FormWidth = width * 0.69;
var FormHeight = height * 1.15;
const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.blue,
    position: 'relative',
    zIndex: 0,
  },
  FormContainer: {
    marginTop: borderTop + iconSize / 2,
    height: 540,
    width: FormWidth,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    position: 'relative',
    zIndex: 2,
  },
  logo: {
    alignSelf: 'center',
    width: 105,
    height: 105,
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
  },
  title: {
    marginTop: iconSize / 2,

    alignSelf: 'center',

    fontSize: Fonts.mainTitle,

    color: Colors.blue,
  },
  subtitle: {
    marginTop: FormHeight * 0.035,

    alignSelf: 'center',

    fontSize: Fonts.subTitle,

    fontSize: Fonts.mainTitle,

    color: Colors.blue,

    fontSize: Fonts.subTitle,

    marginBottom: -10,
  },
  input: {
    color: Colors.black,

    borderBottomColor: Colors.black,

    borderBottomWidth: 1,

    fontSize: Fonts.text,

    paddingBottom: 0,

    width: 180,

    textAlign: 'center',

    marginTop: 10,
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  darkButton: {
    alignSelf: 'center',

    height: 50,

    marginTop: 650,

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
    fontSize: Fonts.button,
  },
  linkText: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: Fonts.text,
    marginTop: 60,
    paddingBottom: 50,
  },
  grayText: {
    paddingTop: 0,
    alignSelf: 'center',
    color: '#A4A4A4',
    fontSize: 10,
  },
  fixTop: {
    zIndex: 100
  }
});

export default EditProfilePassenger;
