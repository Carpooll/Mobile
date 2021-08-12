/* FIGMA: Driver info (siendo ya passenger) */

import React from 'react';
import * as vars from '../Home/HomePassenger';
import Colors from '../../res/Colors';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Fonts from '../../res/Fonts';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Storage from '../../Libs/Storage';


var coorx, coory;

class DetailsPrivate extends React.Component {
  state = {
    car: {},
    markers: {
      latitude: 28.6369439,
      longitude: -106.0767429,
      longitudeDelta: 0.4,
      latitudeDelta: 0.1,
    },
    driverData: [],
    info_driver: {
      profile: {
        user: {},
      },
    },
  };
  componentDidMount = () => {
    this.checkDriver();
  };

  checkDriver = async () => {
    try {
      token = await Storage.instance.get('token');

      let request = await fetch(
        `https://carpool-utch.herokuapp.com/passenger/driver/`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Token ' + token,
          },
        },
      );
      let response = await request.json();
      driverData = response;
      this.setState({driverData: driverData});

      info_driver = driverData[0];

      coorx = info_driver.profile.coordinate_x;
      coory = info_driver.profile.coordinate_y;

      let markers = {
        latitude: coorx,
        longitude: coory,
        longitudeDelta: 0.2,
        latitudeDelta: 0.001,
      };
      this.setState({markers: markers});

      this.setState({info_driver: info_driver});
    } catch (err) {
      console.log('Getting user info error', err);
      throw Error(err);
    }
    try {
      id = info_driver.profile.id;

      let request = await fetch(
        `https://carpool-utch.herokuapp.com/driver/car/${id}/`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Token ' + token,
          },
        },
      );
      let response = await request.json();

      this.setState({car: response});
    } catch (err) {
      console.log('Geting user info error', err);
      throw Error(err);
    }
  };

  
  deletePass = () => {
    Alert.alert(
      'Important',
      `Are you sure you want to delete your driver?`,
      [
        {
          text: 'Yes!',
          onPress: async () => {
            try {
              token = await Storage.instance.get('token');

              let request = await fetch(
                `https://carpool-utch.herokuapp.com/passenger/driver/${id}/`,
                {
                  method: 'DELETE',
                  headers: {
                    Authorization: 'Token ' + token,
                  },
                },
              );
              console.log('deleted')
            } catch (err) {
              console.log('accept pass', err);
              throw Error(err);
            }
          },
        },
        {
          text: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  render() {
    const {car, info_driver} = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <View>
            <View style={styles.imagesContainer}>
              <Image
                style={styles.profileImage}
                source={{uri:`${ info_driver.profile.image}`}}></Image>
            </View>
          </View>
          <View style={styles.formShadow}>
            <TouchableOpacity
              style={styles.deletePass}
              onPress={this.deletePass}>
              <Image
                style={styles.deletePassImg}
                source={{
                  uri: 'https://image.flaticon.com/icons/png/512/109/109602.png',
                }}></Image>
            </TouchableOpacity>
            <View style={styles.dataContainer}>
              <Text style={styles.textName}>
                {info_driver.profile.user.first_name || 'loading'}
              </Text>
              <Text style={styles.phone}>
                {info_driver.profile.phone || 'loading'}
              </Text>

              <Text style={styles.titleLocation}>Driver location</Text>
              <View style={styles.containerMap}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={this.state.markers}>
                  <Marker coordinate={this.state.markers} />
                </MapView>
              </View>
              <Text style={styles.titleCar}>Car information</Text>
              <Text style={styles.textPlates}>Plates: {car.plates}</Text>
              <Text style={styles.textModel}>Model: {car.model}</Text>
              <Text style={styles.textColor}>Color: {car.color}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue,
    paddingTop: '48%',
    paddingBottom: '54.1%',
  },

  imagesContainer: {
    alignSelf: 'center',
    marginTop: -100,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.0,
    elevation: 20,

    width: 110,
    height: 110,
    resizeMode: 'cover',
    borderRadius: 90,
    position: 'absolute',

    zIndex: 2,
  },
  deletePassImg: {
    flex: 2,
    width: '70%',
    height: '70%',
    zIndex: 2,
  },
  deletePass: {
    width: 35,
    height: 35,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 480,
    alignSelf: 'center',
  },

  profileImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 100,

    zIndex: 2,
  },
  mapImage: {
    alignSelf: 'center',
    width: '180%',
    height: '100%',
    marginTop: '150%',
  },

  titleLocation: {
    marginTop: '7%',
    marginBottom: '10%',
    alignSelf: 'center',
    color: Colors.blue,
    fontSize: Fonts.button,
  },
  titleCar: {
    marginTop: '65%',
    marginBottom: '4%',
    alignSelf: 'center',
    color: Colors.blue,
    fontSize: Fonts.button,
  },
  textName: {
    fontSize: 20,
    color: Colors.black,
    textAlign: 'center',
    marginTop: '-22%',
  },
  textAddress: {
    fontSize: Fonts.text,
    color: Colors.black,
    textAlign: 'center',
    marginTop: '-5%',
  },
  phone: {
    fontSize: Fonts.text,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 10,
  },
  textPlates: {
    fontSize: Fonts.text,
    color: Colors.black,
    textAlign: 'center',
  },
  textModel: {
    fontSize: Fonts.text,
    color: Colors.black,
    textAlign: 'center',
    marginTop: '2%',
  },
  textColor: {
    fontSize: Fonts.text,
    color: Colors.black,
    textAlign: 'center',
    marginTop: '2%',
  },

  formShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },

    height: 500,
    marginTop: -30,
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    backgroundColor: Colors.white,
    width: 265,
    borderRadius: 15,
    alignSelf: 'center',
  },

  dataContainer: {
    paddingTop: 130,
    alignSelf: 'center',
  },

  form: {
    paddingHorizontal: 20,
    color: Colors.black,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    marginBottom: 30,
    width: 180,
    textAlign: 'center',
    alignSelf: 'center',
  },

  buttonDark: {
    width: 193,
    padding: 15,
    marginTop: 450,
    borderRadius: 15,
    backgroundColor: Colors.black,
    borderColor: Colors.black,
    borderWidth: 1,
    alignSelf: 'center',
    zIndex: 5,
    position: 'absolute',
  },

  buttonDarkText: {
    textAlign: 'center',
    fontSize: Fonts.button,
    paddingHorizontal: 25,
    color: Colors.white,
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    height: '20%',
    width: 200,
    height: 150,
    marginTop: 180,
    marginLeft: -45,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default DetailsPrivate