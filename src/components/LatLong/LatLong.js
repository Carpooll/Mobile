import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

Geocoder.init('AIzaSyAkyORWI5UQi7YxxYeGZisyktvuTk-spLs');
Geocoder.init('AIzaSyAkyORWI5UQi7YxxYeGZisyktvuTk-spLs', {language: 'es'});

export default class Location extends Component {
  constructor() {
    super();

    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      Address: 'Praderas de gobi',
    };
  }

  async componentDidMount() {
    /*     Geolocation.getCurrentPosition(
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
    ); */
    Geolocation.getCurrentPosition(
      position => {
        Geocoder.from(this.state.Address)

          .then(json => {
            results = json.results[0];

            console.log(JSON.stringify(results.geometry.location.lat));

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
