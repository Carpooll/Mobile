import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  TouchableOpacityComponent,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Colors from '../../res/Colors';
import ModalDeletePass from '../Generics/ModalDeletePass';
import * as vars from '../../Libs/Sessions';

const createTwoButtonAlert = () =>

  Alert.alert(
    'Important',
    'You do not have passenger yet!',
    [{ text: 'OK' }],
  );

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class screens extends Component {
  animation = new Animated.Value(0);

  state = {
    passengers: [],
    markers: [],
    region: {
      latitude: 28.659699,
      longitude: -106.0953865,
      latitudeDelta: 0.24864195044303443,
      longitudeDelta: 0.240142817690068,
    },
  };

  handlePress = () => {
    this.props.navigation.navigate('PassengerPublicProfile');
  };

  startRide = async () => {
    console.log(vars.token)
    try {
      let request = await fetch(
        `https://carpool-utch.herokuapp.com/rides/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Token ${vars.token}`
          }
        },
        );
        let response = await request.json();
        console.log(response)
        if(response !=  {}){
          Alert.alert('Important', 'Your ride has begun.\n\nYour passengers got a notification to go with you !', [{text: 'OK'}]);
        }
        //console.log("the balance is: ")
      //console.log(response);
    } catch (err) {
      console.log('Start ride error', err);
      throw Error(err);
    }
  };

  getPassengers = async () => {
    try {
      let request = await fetch(
        `https://carpool-utch.herokuapp.com/driver/passengers/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Token ${vars.token}`,
          },
        },
      );
      let response = await request.json();
      //console.log(Object.keys(response).length);
      if (Object.keys(response).length === 0) {
        createTwoButtonAlert();
      } else {
        this.setState({ passengers: response });
        const { passengers, markers } = this.state;

        for (var i = 0; i < passengers.length; i++) {
          let marker = {
            coordinate: {
              latitude: passengers[i].profile.coordinate_x,
              longitude: passengers[i].profile.coordinate_y,
            },
            title: passengers[i].profile.user.first_name,
            image: { uri: 'https://res.cloudinary.com/django-api-asgc/image/upload/v1/media/user4_ubl0ry' },
            phone: passengers[i].profile.phone,
          };
          markers.push(marker);

          this.setState({ markers: markers });
        }
      }
    } catch (err) {
      console.log('Get passenger error', err);
    }
  };

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: 'clamp',
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: 'clamp',
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.cardRide} onPress={this.startRide}>
          <Text style={styles.cardRideText}>Start a ride</Text>
        </TouchableOpacity>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.container}>
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };

            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={scaleStyle} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          style={StyleSheet.ScrollView}
          contentContainerStyle={styles.endPadding}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}>
          {this.state.markers.map((marker, index) => {
            return (
              <View key={index} style={styles.card}>
                <Image
                  source={marker.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>
                    {' '}
                    {marker.title}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardphone}>
                    {' '}
                    {marker.phone}
                  </Text>
                  <View style={styles.buttons}>
                    <ModalDeletePass></ModalDeletePass>
                  </View>
                </View>
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
    );
  }

  componentDidMount() {
    this.index = 0;
    this.getPassengers();

    //this.getMarkers();
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index != index) {
          this.index = index;
          const {coordinate} = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  buttons: {
    width: 165,
    height: 40,

    justifyContent: 'center',
  },
  card: {
    elevation: 4,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT + 10,
    width: CARD_WIDTH,
    overflow: 'hidden',
    borderRadius: 5,
  },
  cardImage: {
    marginTop:10,
    width: '100%',
    height: '50%',
    alignSelf: 'center',
  },
  cardphone: {
    alignSelf: 'center',
    color: '#424242',
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.blue,
    padding: 5,
    borderRadius: 10,
  },

  blueButton: {
    height: 15,
    width: 50,
    marginLeft: 47,
    borderRadius: 3,
    backgroundColor: '#bdbdbd',
    zIndex: 2,
    marginBottom: 13,
  },

  blueButtonText: {
    alignSelf: 'center',
    color: '#e0e0e0',
    fontSize: 12,
  },
  blueButtonText: {
    alignSelf: 'center',
    color: '#e0e0e0',
    fontSize: 12,
  },
  cardRide: {
    backgroundColor: '#0081A7',
    width: 150,
    height: 60,

    position: 'absolute',

    marginTop: 50,

    zIndex: 2,

    borderRadius: 15,

    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },

  cardRideText:{

    color: Colors.white,

    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',

    fontSize: 25
  },
});

export default screens;
