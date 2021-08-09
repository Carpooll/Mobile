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
  Alert
} from 'react-native';
import RNRestart from 'react-native-restart'
import Fonts from '../../res/Fonts';
import Colors from '../../res/Colors';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import UserSession from '../../Libs/Sessions';
import Storage from '../../Libs/Storage';
import * as vars from '../../Libs/Sessions';
// NEEDS TO CHANGE TO DYNAMIC DATA

var Car = {};
var userBalance;

class ProfileDriver extends React.Component {
  state = {
    user: {
      profile: {},
    },
    car: {},
    markers: {
      latitude: 28.6369439,
      longitude: -106.0767429,
      longitudeDelta: 0.4,
      latitudeDelta: 0.1,
    },
  };
  componentDidMount = () => {
    this.getCarData();
    this.getBalance();
    this.getUserData();
    //this.getMarkers();
  };

  getBalance = async () => {
    try {
      let request = await fetch(
        `https://carpool-arduino-backend.herokuapp.com/getUser/?user_id=${vars.username}`,
        {
          method: 'GET',
        },
      );

      let response = await request.json();
      userBalance = response.current_balance;
      console.log(userBalance, "usr")
    } catch (err) {
      console.log('get balance err', err);
      throw Error(err);
    }
  };

  getCarData = async () => {
    try {
      id = await Storage.instance.get('id');
      token = vars.token;
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
      Car = response;
      this.setState({car: Car});
      return response;
    } catch (err) {
      console.log('Get car data err', err);
    }
  };
  getUserData = async () => {
    let user = await UserSession.instance.getUser();
    let markers = {
      latitude: user.profile.coordinate_x,
      longitude: user.profile.coordinate_y,
      longitudeDelta: 0.0,
      latitudeDelta: 0.001,
    };
    this.setState({user: user, markers: markers});
  };
  handlePress = () => {
    this.props.navigation.navigate('EditProfileDriver');
  };
  logout = () => {
    /* gives an alert to logout */
    Alert.alert('Logout',
    `Do you really want to logout?`,
    [
        {
            text: 'Cancel',
            style:'cancel'
        },
        {
            text: 'Logout',
            onPress:async() =>{this.setState({
                loading: true})
                try{
                    await Storage.instance.remove('id')
                }
                catch(e){
                    console.log('id error', e)
                }
                try{
                    RNRestart.Restart();
                }catch(e){
                    console.log('error restarting application', e)
                    
                }
            },
            style:'destructive',
        },    
    ],
    {
        cancelable: true,
    }
    )
}
  render() {
    const {user, car} = this.state;
    return (
      <ScrollView style={Styles.Container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={Styles.imageContainer}>
          <Image
            style={Styles.image}
            source={{
              uri: 'https://images.unsplash.com/photo-1624759314986-43bee161a691?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMzfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            }}
          />
        </View>
        <View style={Styles.infoContainer}>
          <Text style={Styles.userName}>{user.first_name}</Text>
          <Text style={Styles.userInfo}>{user.username}</Text>
          <Text style={Styles.userInfo}>{user.profile.phone}</Text>

          <Text style={Styles.userTitle}>Car Info</Text>
          <Text style={Styles.userInfo}>{car.model}</Text>
          <Text style={Styles.userInfo}>{car.color}</Text>
          <Text style={Styles.userInfo}>{car.plates}</Text>

          <Text style={Styles.userTitle}>Your Profits</Text>
          <View style={Styles.profitContainer}>
            <Text style={Styles.userInfo}>${userBalance}</Text>
          </View>
          <Text style={Styles.profitTime}>This Week</Text>

          <Text style={Styles.userTitle}>Your Location</Text>
          <View style={Styles.containerMap}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={Styles.map}
              initialRegion={this.state.markers}>
              <Marker coordinate={this.state.markers} />
            </MapView>
          </View>
        </View>
        <TouchableOpacity style={Styles.darkButton} onPress={this.handlePress}>
          <Text style={Styles.darkButtonText}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.redButton} onPress={this.logout}>
          <Image 
            style={Styles.redButtonText}
            source={require('../../assets/logout_icon.png')}
          />
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
var FormHeight = height * 0.7;

const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.blue,
    position: 'relative',
    zIndex: 0,
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 140,
    height: height * 0.7,
    width: FormWidth,
    alignSelf: 'center',
    padding: 'auto',

    backgroundColor: Colors.white,
    borderRadius: 15,
    position: 'relative',
  },
  image: {
    alignSelf: 'center',
    height: iconSize,
    width: iconSize,
    borderRadius: iconSize / 2,
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    height: '20%',
    width: 150,
    marginTop: 385,
    marginLeft: 60,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  imageContainer: {
    marginTop: borderTop,
    alignSelf: 'center',
    height: iconSize,
    width: iconSize,
    backgroundColor: Colors.white,
    position: 'absolute',
    borderRadius: iconSize / 2,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },

  userName: {
    display: 'flex',
    marginTop: -100,
    color: Colors.black,
    fontSize: 20,
  },

  userInfo: {
    color: Colors.black,
    fontSize: Fonts.miniButtons,
  },

  userTitle: {
    marginBottom: 10,
    color: Colors.blue,
    fontSize: Fonts.button,

    marginTop: 20,
  },

  profitContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: 94,
    height: 44,

    backgroundColor: Colors.white,

    borderColor: '#F1F1F1',
    borderWidth: 2,
    borderRadius: 7,
    zIndex: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 6,

    elevation: 10,
  },

  profitTime: {
    paddingTop: 5,
    fontSize: 10,
    color: '#A4A4A4',
  },

  mapContainer: {
    height: 90,
    width: 100,
    borderRadius: 7,
    zIndex: 2,

    backgroundColor: Colors.blue,
  },

  darkButton: {
    alignSelf: 'center',
    height: FormHeight * 0.1,
    marginTop: -25, //590
    width: FormWidth * 0.6,

    borderRadius: 15,

    fontSize: Fonts.miniButtons,
    backgroundColor: Colors.black,

    justifyContent: 'center',

    zIndex: 10,
  },

  darkButtonText: {
    alignSelf: 'center',
    color: Colors.white,
  },
  redButton: {
    alignSelf: 'center',
    height: FormHeight * 0.1,
    
    width: FormWidth * 0.19,
    borderRadius: 50,
    marginTop:height*.08,
    left:55,
    fontSize: Fonts.miniButtons,
    backgroundColor: 'red',
    position:'absolute',
    justifyContent: 'center',

    zIndex: 5,
  },

  redButtonText: {
    alignSelf: 'center',

  },
});

export default ProfileDriver;
