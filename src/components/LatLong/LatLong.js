//Getting lat and long with the address that the user puts by hand.
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import api from '../../../config'

Geocoder.init(api);
Geocoder.init(api, {language: 'es'});

export default class Location extends Component {
  constructor() {
    super();

    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      Address: 'Km 3.5 Carretera Chihuahua a Aldama Colinas de León, 31313 Chihuahua, Chih.',
    };
  }

  async componentDidMount() {
    /*      Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        Geocoder.from(position.coords.latitude, position.coords.longitude)

          .then(json => {
            //console.log(json);
            var addressComponent = json.results[2];
            this.setState({
              Address: addressComponent,
            });
            console.log(addressComponent);
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
    );  */

    Geolocation.getCurrentPosition(
      position => {
        Geocoder.from(this.state.Address)

          .then(json => {
            results = json.results[0];

            latitud = JSON.stringify(results.geometry.location.lat)
            longitud = JSON.stringify(results.geometry.location.lng)
            console.log(latitud)
            console.log(longitud)
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
  }

  render() {
    return (
      <View>
        {this.state.error ? <Text> Error : {this.state.error} </Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5fcff',

    padding: 11,
  },

  text: {
    fontSize: 22,

    color: '#000',

    textAlign: 'center',

    marginBottom: 10,
  },
});
