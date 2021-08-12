import React from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import RNRestart from 'react-native-restart'
import Fonts from '../../res/Fonts';
import Colors from '../../res/Colors';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as vars from '../../Libs/Sessions'
import UserSession from '../../Libs/Sessions';
import Storage from '../../Libs/Storage';

// NEEDS TO CHANGE TO DYNAMIC DATA
var userBalance=0;
class PassengerPrivate extends React.Component {
  state = {
    user: {
      profile: {},
    },
    markers: {
      latitude: 28.6369439,
      longitude: -106.0767429,
      longitudeDelta: .40,
      latitudeDelta: 0.100,
    },
    balance:0,
  };

  componentDidMount = () => {  
    this.fetchdata();
    this.focusEvent();
    this.blurEvent();
    //this.getMarkers();
  };

  fetchdata = () => {
    this.getUserData();
    this.getBalance()
  }

  getUserData = async () => {
    let user = await UserSession.instance.getUser();
    let markers ={
      latitude: user.profile.coordinate_x,
      longitude: user.profile.coordinate_y,
      longitudeDelta: 0.0,
      latitudeDelta: 0.001,}
      console.log(markers.latitude, user.profile.coordinate_y)
      this.setState({user: user, markers: markers});
  };

  getBalance = async () => {
    try {
      console.log(vars.username, )
      let request = await fetch(
        `https://carpool-arduino-backend.herokuapp.com/getUser/?user_id=${vars.username}`,
        {
          method: 'GET',
        },
      );

      let response = await request.json();
   
      userBalance = response.current_balance;
      this.setState({balance:userBalance})
    } catch (err) {
      console.log('get balance err', err);
      throw Error(err);
    }
  };

  handlePress = () => {
    this.props.navigation.navigate('EditProfilePassenger');
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

    //next event clear the interval that was set before
    focusEvent = () => {
      this.focusListener = this.props.navigation.addListener('focus', () => {
        this.setFetchInterval();
      });
    };
  
  //next event clear the interval that was set before
    blurEvent = () => {
      this.blurListener = this.props.navigation.addListener('blur', () => {
        clearInterval(this.interval);
      });
    };
  
    // setting an interval of 3s
    setFetchInterval = () => {
      this.interval = setInterval(this.fetchdata, 3000);
    };

    componentWillUnmount = () =>{
      this.focusListener();
      this.blurListener();
    }


  render() {
    const {user, markers, balance} = this.state;
    //console.log(user);
    return (
      <ScrollView style={Styles.Container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={Styles.imageContainer}>
          <Image
            style={Styles.image}
            source={{
              uri: 'https://res.cloudinary.com/django-api-asgc/image/upload/v1/media/user4_ubl0ry',
            }}
          />
        </View>
        <View style={Styles.infoContainer}>
          <Text style={Styles.userName}>{user.first_name}</Text>
          <Text style={Styles.schoolId}>{user.username}</Text>
          <Text style={Styles.phone}>{user.profile.phone}</Text>

          <Text style={Styles.userTitle}>Your current balance</Text>
          <View style={Styles.profitContainer}>
            <Text style={Styles.userInfo}>${balance}</Text>
          </View>

          <Text style={Styles.loc}>Location</Text>
          <View style={Styles.containerMap}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={Styles.map}
              initialRegion={markers}>
              <Marker coordinate={markers} />
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
    marginTop: 135,
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
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    height: '25%',
    width: FormWidth*.80,
    marginTop: FormHeight*.63,
    marginLeft: FormWidth*.10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  userName: {
    display: 'flex',
    marginTop: -140,
    color: Colors.black,
    fontSize: 20,
  },
  schoolId: {
    marginTop: 10,
    color: Colors.black,
    fontSize: Fonts.miniButtons,
  },
  phone: {
    marginTop: 10,
    color: Colors.black,
    fontSize: Fonts.miniButtons,
  },

  userTitle: {
    color: Colors.blue,
    fontSize: 20,

    marginTop: 20,
  },

  profitContainer: {
    marginTop: '5%',
    marginBottom: '2%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: 94,
    height: 44,

    backgroundColor: Colors.white,

    borderRadius: 7,
    zIndex: 2,

    shadowColor: Colors.black,
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: -5, height: -30},
  },

  profitTime: {
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

    zIndex: 5,
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
    backgroundColor: Colors.white,
    position:'absolute',
    justifyContent: 'center',

    zIndex: 5,
  },

  redButtonText: {
    alignSelf: 'center',

  },
  loc: {
    color: Colors.blue,
    fontSize: 20,
    marginTop: 20,
    marginBottom: '3%',
  },
});

export default PassengerPrivate;
