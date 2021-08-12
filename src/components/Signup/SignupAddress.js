import React from 'react';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {launchImageLibrary} from 'react-native-image-picker';
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
  Alert,
} from 'react-native';
import Fonts from '../../res/Fonts';
import Colors from '../../res/Colors';
import * as vars from '../../Libs/Sessions';
import UserSession from '../../Libs/Sessions';
import Storage from '../../Libs/Storage';

var address = ''
var Lat=0
var Lng=0
var lng=0
var lat=0
export var Address = ''

Geocoder.init('AIzaSyAp0yzmKQT9t6pXXJ3xLHrxzedpOS-6hYg');
Geocoder.init('AIzaSyAp0yzmKQT9t6pXXJ3xLHrxzedpOS-6hYg', {language: 'es'});

const createTwoButtonAlert = () =>
  Alert.alert('Important', 'Your data was succesfully registered', [
    {text: 'OK'},
  ]);

const addressFields = () =>
  Alert.alert(
    'Important',
    'Your address information is ready, no need to fill it.',
    [{text: 'Got it'}],
  );
const addressAlert = () =>
  Alert.alert('Verify your address', `${Address}`, [
    {
      text: 'It is ok!',
      onPress: () => {
        addressFields()
      }
    },
    {text: 'I prefer to introduce it manually!'},
  ]);

class SignUpAdrress extends React.Component {
  state = {
    errors: [],
    form: {
      profile: {
        street: '',
        suburb: '',
        postal_code: 0,
        external_number: 0,
        coordinate_x: 0.0,
        coordinate_y: 0.0,
      },
    },

    driver: vars.driver,
    latitude: 0,
    longitude: 0,
    error: null,
    user: {
      address: '',
    },
    picture: {},
  };

  handleSubmit = async () => {
    const {driver, form, user} = this.state;
    //console.log(Lat)
    //console.log(Lng)
    if (Lat == 0 && Lng == 0) {
      try {
        address = form.profile.street.concat(
          ' ',
          form.profile.external_number.concat(
            ' ',
            form.profile.suburb.concat(' ', form.profile.postal_code),
          ),
        );
        user.address = address;

        Geolocation.getCurrentPosition(
          position => {
            Geocoder.from(user.address)
              .then(json => {
                results = json.results[0];
                latitud = JSON.stringify(results.geometry.location.lat);
                //console.log(latitud)
                lat = parseFloat(latitud);
                //console.log(Lat)
                form.profile.coordinate_x = lat;
                //console.log(form.profile.coordinate_x)
                longitud = JSON.stringify(results.geometry.location.lng);
                lng = parseFloat(longitud);
                form.profile.coordinate_y = lng;
                //console.log(form.profile.coordinate_y)
                //console.log(form);
                let response = UserSession.instance.signupData(this.state.form);
                if (response) {
                  if (driver == true) {
                    this.props.navigation.replace('SignupCar');
                  } else if (driver == false) {
                    createTwoButtonAlert();
                    this.props.navigation.navigate('TabNavigatorPassenger');
                  }
                }
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
    } else {
      //console.log(Address);
      console.log(this.state.form, 'form')
      let response = await UserSession.instance.signupData(this.state.form);
      //console.log(response)
      /* console.log(typeof(response))
        console.log(typeof(vars.username)) */
      if (response == vars.username) {
        //console.log(vars.driver);
        if (driver == true) {
          this.props.navigation.replace('SignupCar');
          console.log("Signup car")
        } else if (driver == false) {
          createTwoButtonAlert();
          this.props.navigation.replace('TabNavigatorPassenger');
          console.log("Home passenger")
        }
      } else {
        console.log('Signup data error, button', response);
      }
    }
  };

  //boton
  handleGetLocation = async () => {
    const {form} = this.state;
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        Geocoder.from(position.coords.latitude, position.coords.longitude)

          .then(json => {
            //console.log(json);
            var addressComponent = json.results[1];
            this.setState({
              Address: addressComponent,
            });
            //console.log(addressComponent);

            Address = addressComponent.formatted_address;
            this.setState({address: Address});
            addressAlert();
            //console.log(addressComponent.geometry.location.lat)
            Latitud = addressComponent.geometry.location.lat;
            Lat = parseFloat(Latitud);
            //console.log(Lat);
            form.profile.coordinate_x = Lat;
            //console.log(form.profile.coordinate_x);

            Longitud = addressComponent.geometry.location.lng;
            Lng = parseFloat(Longitud);
            form.profile.coordinate_y = Lng;
            //console.log(form.profile.coordinate_y);
            // this.handleSubmit();
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
  };

  handleChooseProfileImage = () => {
    const options = {
      includeBase64: false,
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        let photo = response.assets[0].uri;
        this.setState({picture: photo});/* 
        console.log(photo);
        console.log(this.state.picture) */
        this.editProfilePicture();
      }
    });
  };
  editProfilePicture = async () => {
    const {picture} = this.state;
    id=await Storage.instance.get('id')
    
    let uploadData = new FormData();
    uploadData.append('profile.image', {
      type: 'image/jpeg',
      uri: picture,
      name: 'profile.jpg',
    });
  
    try {
      //creating the request
      let request = await fetch(
        `https://carpool-utch.herokuapp.com/profile/${id}/`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + vars.token,
          },
          body: uploadData,
        },
      );
      //console.log(request);
      //saving the response
      let response = await request.json();
      console.log(response)
      //returning the response
      return response;
    } catch (err) {
      //showing the errors
      console.log('uploading profile image in signup error', err);
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


            <Text  style={Styles.iconUploadImageText}>Upload your profile picture</Text>
          <TouchableOpacity
            style={Styles.iconT}
            onPress={this.handleChooseProfileImage}>
            <Image
              style={Styles.iconUploadImage}
              source={{uri: 'https://image.flaticon.com/icons/png/512/1837/1837526.png'}}
            />
             </TouchableOpacity>


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
          
          {vars.driver ? (
            <View>
                  <Text style={Styles.titleA}>Passenger range</Text>
            <TextInput
            style={Styles.inputR}
            placeholder="Range (km)"
            placeholderTextColor={Colors.black}
            onChangeText={text => {
              this.setState(prevState => {
                let form = Object.assign({}, prevState.form);
                form.profile._range = text;
                return {form};
              });
            }}
            />
            <Text style={Styles.label}>Maximum range to pick up a passenger</Text>
            </View>
                  ) : null}
          <Text style={Styles.titleA}>Address</Text>
          <TouchableOpacity
            style={Styles.locationButton}
            onPress={this.handleGetLocation}>
            <Text style={Styles.locationTitle}>Use my current location</Text>
            {this.state.error ? (
              <Text> Error : {this.state.error} </Text>
            ) : null}
          </TouchableOpacity>
          {this.state.error ? <Text> Error : {this.state.error} </Text> : null}
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
  inputR:{
    marginLeft:50,
    color: Colors.black,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    fontSize: Fonts.text,
    paddingBottom: 8,
    marginBottom: 25,
    width: 180,
    textAlign: 'center',
  },
  Container: {
    backgroundColor: Colors.blue,
    position: 'relative',
    zIndex: 0,
  },
  iconT: {
    width: 35,
    height: 35,
    padding: 5,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
  },
  iconUploadImage:{
    flex: 2,
    width: '100%',
    height: '100%',
  },
  iconUploadImageText:{

marginBottom:50,
  },
  FormContainer: {
    marginTop: borderTop + iconSize / 2,
    height: FormHeight + 470,
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
    marginTop: FormHeight + 580,
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
    height: 60,
    marginTop: 20,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#A7C7E7',
    alignItems: 'center',
  },
  label:{
    marginLeft:39,
    fontSize: 10,
    marginTop: -15,
    color: '#A497A6'
  }
});

export default SignUpAdrress;
