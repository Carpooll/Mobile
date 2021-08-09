import React from 'react';
export var driver = false;
export var driverData = [];
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
import UserSession from '../../Libs/Sessions';
import Storage from '../../Libs/Storage';
import * as vars from '../../Libs/Sessions';

class HomePassenger extends React.Component {
  state = {
    drivers: [],
    markers: [],
    driver: false,
    driverData:[],
    info_id: undefined,
    info_coorx: undefined,
    info_coory: undefined,
   };

  componentDidMount = () => {
    this.checkDriver();
    this.getDriver();
    
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
      driverData=response
      this.setState({driverData:driverData})
      driver = true;
      info_driver = driverData[0];

      info_id = info_driver.profile.id
      info_id = JSON.stringify(info_id)

      this.setState({driver: driver})
   
    } catch (err) {
      console.log('Getting user info error', err);
      throw Error(err);
    }

  }; 

  handlePress = id => {
    Alert.alert(
      'Important',
      `Do you really want to travel with this driver?\n\nThis choice can be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Yes!',
          onPress: async () => {
            let body = {
              title: "Hey, I'd like to travel with you!",
              text: 'Do you accept?',
              sendee: parseInt(id),
            };
            token = await Storage.instance.get('token');

            let request = await fetch(
              `https://carpool-utch.herokuapp.com/requests/`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Token ' + vars.token,
                },
                body: JSON.stringify(body),
              },
            );

            let response = await request.json();
            if (response.status == 'pending') {
              Alert.alert(
                'Important',
                'Successful request\n\nWait for the driver response.',
                [{text: 'OK'}],
              );
            } else if (
              response.message ==
              'Usted ya envio una solicitud a este conductor'
            ) {
              Alert.alert(
                'Important',
                'You already sent a request to this driver. \n\nWait for the driver response.',
                [{text: 'OK'}],
              );
            }
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );

    /* this.props.navigation.navigate('DetailsPublic', {marker}); */
  };

  getDriver = async () => {
    try {
      
      token = await Storage.instance.get('token');
      let request = await fetch(
        `https://carpool-utch.herokuapp.com/drivers/available/`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Token ' + token,
          },
        },
      );
      let response = await request.json();
      this.setState({drivers: response});

      const {drivers, markers} = this.state;
    for (var i = 0; i < drivers.length; i++) {
        let driver = {
          name: drivers[i].first_name,
          travel_cost: drivers[i].travel_cost,
          profile_id: drivers[i].profile_id,
        };
        markers.push(driver);
        this.setState({markers: markers});
        //console.log(markers)
      }  
      return response;
    } catch (err) {
      console.log('get drivers err', err);
      throw Error(err);
    }
    //let drivers = await UserSession.instance.availableDrivers();
  };

  render() {

    const {markers} = this.state;
       
    
    return (
      <ScrollView style={Styles.Container}>
        
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={Styles.marginTopCards}>
          {this.state.markers.map((marker, profile_id) => {
            return (
              <View style={Styles.FormContainer}>
                <View style={Styles.FormContainerLeft}>
                  <View style={Styles.pictureContainer}>
                    <Image
                      style={Styles.picture}
                      source={{
                        uri: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2018/08/fotos-perfil-whatsapp_16.jpg?itok=fl2H3Opv',
                      }}
                    />
                  </View>
                </View>
                <View key={profile_id} style={Styles.FormContainerRight}>
                  <Text style={Styles.nameDriver}>{marker.name}</Text>
                  <Text style={Styles.priceDriver}>{marker.travel_cost}</Text>
                </View>
                <TouchableOpacity
                  style={Styles.darkButton}
                  onPress={() => this.handlePress(marker.profile_id)}>
                  <Text style={Styles.darkButtonText}>Request driver</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        
      </ScrollView>
    );
  }
}


var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var iconSize = height * 0.135;
var borderTop = height * 0.12;
var FormWidth = width * 0.8;
var FormHeight = 125;
const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.blue,
    height: '100%',
    zIndex: 0,
    paddingBottom: 100,
  },
  FormContainer: {
    marginTop: 30,
    height: FormHeight,
    width: FormWidth,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  marginTopCards: {
    marginTop: 70,
  },
  FormContainerLeft: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  FormContainerRight: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },
  picture: {
    alignSelf: 'center',
    height: iconSize,
    width: iconSize,
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
  pictureContainer: {
    alignSelf: 'center',
    height: iconSize,
    width: iconSize,
    backgroundColor: Colors.white,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: iconSize / 2,
    zIndex: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },

 nameDriver : {
    marginTop: 20,

    marginLeft: 30,

    alignSelf: 'center',

    fontSize: Fonts.subTitle,

    fontSize: Fonts.mainTitle,

    color: Colors.black,

    fontSize: Fonts.subTitle,
  },

  priceDriver: {
    marginTop: 20,

    marginLeft: 30,

    fontSize: Fonts.subTitle,

    fontSize: Fonts.mainTitle,

    color: Colors.black,

    fontSize: Fonts.subTitle,
  },

  darkButton: {
    height: FormHeight * 0.2,
    marginTop: FormHeight - 16,
    width: FormWidth * 0.39,
    borderRadius: 8,
    fontSize: Fonts.miniButtons,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    zIndex: 5,
    marginLeft: -100,
  },
  darkButtonText: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: Fonts.miniButtons,
  },

  grayText: {
    paddingTop: 0,
    alignSelf: 'center',
    color: '#A4A4A4',
    fontSize: 10,
  },
});

export default HomePassenger;
