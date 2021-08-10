import React from 'react';
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

class EditProfileDriver extends React.Component {
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
        await UserSession.instance.signupData(this.state.form);
        await UserSession.instance.SignupPayment(this.state.form);
        this.props.navigation.replace('ProfileDriver');
      }
    } catch (err) {
      console.log('Edit profile error', err);
      this.props.navigation.replace('ProfileDriver');
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
              var aux = this.state.form
              aux =  {
                profile:{
                  coordinate_x:lat,
                  coordinate_y:lng
                }
              }
              this.setState({aux: aux});
              //console.log(this.state.aux)
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
    const {aux, form} = this.state
      let form2 = {
        profile: {

          "phone":form.profile.phone,
          "street": form.profile.street,
          "suburb": form.profile.suburb,
          "postal_code": form.profile.postal_code,
          "internal_number": form.profile.internal_number,
          "external_number": form.profile.external_number,
          "coordinate_x": aux.profile.coordinate_x,
          "coordinate_y": aux.profile.coordinate_y,
        }
      }
      console.log(form2)
      await UserSession.instance.signupData(form2);
      await UserSession.instance.SignupPayment(this.state.form);
      await UserSession.instance.signupCar(this.state.form);
      this.props.navigation.replace('ProfileDriver');
    
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
            <Text style={Styles.subtitle}>Personal data</Text>
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
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.profile.postal_code = text;
                  return {form};
                });
              }}></TextInput>
            <Text style={Styles.grayText}>Postal code</Text>

            <Text style={Styles.subtitle}>Payment</Text>

            <TextInput
              style={Styles.input}
              placeholder="Name"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.card_owner = text;
                  return {form};
                });
              }}></TextInput>
            <Text style={Styles.grayText}>Name</Text>

            <TextInput
              style={Styles.input}
              placeholder="Card number"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.card_number = text;
                  return {form};
                });
              }}></TextInput>
            <Text style={Styles.grayText}>Card number</Text>

            <TextInput
              style={Styles.input}
              placeholder="Expiration date"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.exp_date = text;
                  return {form};
                });
              }}></TextInput>
            <Text style={Styles.grayText}>Expiration date</Text>

            <TextInput
              style={Styles.input}
              placeholder="CVV"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.ccv = text;
                  return {form};
                });
              }}></TextInput>
            <Text style={Styles.grayText}>CVV</Text>

            <Text style={Styles.subtitle}>Car data</Text>

            <TextInput
              style={Styles.input}
              placeholder="Color"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.color = text;
                  return {form};
                });
              }}></TextInput>
            <Text style={Styles.grayText}>Color</Text>

            <TextInput
              style={Styles.input}
              placeholder="Model"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.model = text;
                  return {form};
                });
              }}></TextInput>
            <Text style={Styles.grayText}>Model</Text>

            <TextInput
              style={Styles.input}
              placeholder="Insurance policy"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.insurance = text;
                  return {form};
                });
              }}></TextInput>
            <Text style={Styles.grayText}>Insurance policy</Text>

            <TextInput
              style={Styles.input}
              placeholder="Plates"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.plates = text;
                  return {form};
                });
              }}></TextInput>
            <Text style={Styles.grayText}>Plates</Text>
          </View>
        </View>
        <TouchableOpacity style={Styles.darkButton} onPress={this.handleSubmit}>
          <Text style={Styles.darkButtonText}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <ModalDelete></ModalDelete> */}
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
var FormHeight = height * 1.37;
const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.blue,
    position: 'relative',
    zIndex: 0,
  },
  FormContainer: {
    marginTop: borderTop + iconSize / 2,
    height: FormHeight - 30,
    width: FormWidth,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    position: 'relative',
    marginBottom: 50,
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
  },
  input: {
    color: Colors.black,

    borderBottomColor: Colors.black,

    borderBottomWidth: 1,

    fontSize: Fonts.text,

    paddingBottom: 0,

    width: 180,

    textAlign: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  darkButton: {
    alignSelf: 'center',

    height: FormHeight * 0.05,

    marginTop: 1140,

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
  grayText: {
    paddingTop: 0,
    alignSelf: 'center',
    color: '#A4A4A4',
    fontSize: 10,
  },
});

export default EditProfileDriver;