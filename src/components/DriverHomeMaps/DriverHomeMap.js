import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Colors from '../../res/Colors';
import Fonts from '../../res/Fonts';
import ModalDeletePass from '../Generics/ModalDeletePass';

const Images = [
  {
    uri: 'https://images.pexels.com/photos/7275394/pexels-photo-7275394.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
  {
    uri: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
  {
    uri: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
  {
    uri: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
];

const {width, height} = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class screens extends Component {
  animation = new Animated.Value(0);

  state = {
    markers: [
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817,
        },
        title: 'Trina',
        image: Images[0],
        phone:6142508855
      },
      {
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507,
        },
        title: 'Armando',
        image: Images[1],
        phone:6142508855
      },
      {
        coordinate: {
          latitude: 45.5230786,
          longitude: -122.6701034,
        },
        title: 'Ximena',
        image: Images[2],
        phone:6142508855
      },
      {
        coordinate: {
          latitude: 45.521016,
          longitude: -122.6561917,
        },
        title: 'Michell',
        image: Images[3],
        phone:6142508855
      },
    ],
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  componentWillMount() {
    this.index = 0;
  }

  handlePress = () =>{
    this.props.navigation.navigate('PassengerPublicProfile')
  }

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
      return {scale, opacity};
    });

    return (
      <View style={styles.container}>
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
                    {/* <TouchableOpacity
                      style={styles.blueButton}
                      onPress={this.handlePress}>
                      <Text style={styles.blueButtonText}>Delete</Text>
                    </TouchableOpacity> */}
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
    this.animation.addListener(({value}) => {
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
    height: CARD_HEIGHT+10,
    width: CARD_WIDTH,
    overflow: 'hidden',
    borderRadius: 5,
  },
  cardImage: {
    width: '100%',
    height: '65%',
    alignSelf: 'center',
  },
  cardphone:{
    alignSelf:'center',
    color:'#424242'
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
    marginBottom:13
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
});

export default screens;
