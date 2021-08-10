import React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Storage from '../../Libs/Storage';
import Colors from '../../res/Colors';
import Fonts from '../../res/Fonts';
import * as vars from '../../Libs/Sessions';

// NEEDS TO CHANGE TO DYNAMIC DATA
var notifications = [];
var FormHeight = 125;
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var iconSize = height * 0.135;
var borderTop = height * 0.12;
var FormWidth = width * 0.8;
var userBalance = 0;

class Notifications extends React.Component {
  state = {
    notifications: [],
    markers: [],
  };

  componentDidMount = () => {
    this.getNotifications();
  };

  getNotifications = async () => {
    try {
      token = await Storage.instance.get('token');

      let request = await fetch(
        `https://carpool-utch.herokuapp.com/requests/`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Token ' + token,
          },
        },
      );
      let response = await request.json();
      let notifications = response.results;
      this.setState({notifications: notifications});

      const {markers} = this.state;

      for (var i = 0; i < notifications.length; i++) {
        let notification = {
          title: notifications[i].title,
          text: notifications[i].text,
          passenger_id: notifications[i].sender,
          id_notification: notifications[i].id,
          ride_cost: notifications[i].ride_cost,
          driver_id: notifications[i].sender,
        };
        markers.push(notification);
        this.setState({markers: markers});
        //console.log(markers)
      }
    } catch (err) {
      console.log('Geting user info error', err);
      throw Error(err);
    }
  };

  acceptRide = async (id_notification, ride_cost, driver_id) => {
      
    try {
      let request = await fetch(
        `https://carpool-arduino-backend.herokuapp.com/getUser/?user_id=${vars.username}`,
        {
          method: 'GET',
        },
      );

      //falta agarrar el costo del viaje y ver si tiene suficiente dinero para pagar el ride
      //mover el dinero de el pasajero al driver
      let response = await request.json();
      userBalance = response.current_balance;
    } catch (err) {
      console.log('get balance err', err);
      throw Error(err);
    }

    Alert.alert(
      'Important',
      `Are you sure you want to join to the ride?`,
      [
        {
          text: 'Join',
          onPress: async () => {
            let verifyingPay = userBalance - ride_cost;

            
            //mandar el dinero descontado al driver y descontarselo al pasajero
            if (verifyingPay >= 0) {
                token = await Storage.instance.get('token');
                id = await Storage.instance.get('id');
                let body = {
                  driver: driver_id,
                  passenger: parseInt(id),
                  amount: ride_cost,
                };
                
                let request = await fetch(
                  `https://carpool-utch.herokuapp.com/transaction/`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                  },
                );
                let response = await request.json();
                console.log("money",response)
                console.log(body)
              try {
                token = await Storage.instance.get('token');
                id = await Storage.instance.get('id');
                let body = {
                  status: 'accept',
                };
                let request = await fetch(
                  `https://carpool-utch.herokuapp.com/rides/confirmation/${id_notification}/`,
                  {
                    method: 'PATCH',
                    headers: {
                      Authorization: 'Token ' + token,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                  },
                );
                let response = await request.json();
                if (response.message == 'Se acepto la solicitud') {
                  Alert.alert(
                    'Important',
                    `You accepted the ride\n\nYour current balance is: ${verifyingPay}`,
                    [{text: 'OK'}],
                  );
                }
              } catch (err) {
                console.log('accept ride', err);
                throw Error(err);
              }
            } else {
              Alert.alert(
                'Important',
                `insufficient funds\n\nYou can recharge your account at our ATM located at UTCH-BIS. `,
                [{text: 'OK'}],
              );
            }
          },
        },
        {
          text: 'Close',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  deleteNotification = async id_notification => {
    token = await Storage.instance.get('token');
    console.log(id_notification);
    try {
      let request = await fetch(
        `https://carpool-utch.herokuapp.com/requests/${id_notification}/`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Token ' + token,
          },
        },
      );
      this.forceUpdate()
    } catch (err) {
        this.forceUpdate()
      console.log('delete notification err', err);
      throw Error(err);
    }
  };

  render() {
    return (
      <ScrollView style={Styles.Container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={Styles.marginTopCards}>
          {this.state.markers.map((marker, index) => {
            return (
              <View style={Styles.FormContainer}>
                <View style={Styles.FormContainerLeft}>
                  <View style={Styles.pictureContainer}>
                    <Image
                      style={Styles.picture}
                      source={{
                        uri: 'https://image.flaticon.com/icons/png/512/3602/3602145.png',
                      }}
                    />
                  </View>
                </View>
                <View key={index} style={Styles.FormContainerRight}>
                  <Text style={Styles.nameDriver}>{marker.title}</Text>
                  <Text style={Styles.priceDriver}>{marker.text}</Text>
                </View>
                <TouchableOpacity
                  style={Styles.darkButton}
                  onPress={() =>
                    this.deleteNotification(marker.id_notification)
                  }>
                  <Text style={Styles.darkButtonText}>Delete</Text>
                </TouchableOpacity>
                {marker.title == 'Your driver has begun a ride' ? (
                  <View>
                    <TouchableOpacity
                      style={Styles.blueButton}
                      onPress={() =>
                        this.acceptRide(
                          marker.id_notification,
                          marker.ride_cost,
                          marker.driver_id,
                        )
                      }>
                      <Text style={Styles.blueButtonText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
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

var FormWidth = width * 0.8;

const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.blue,
    position: 'relative',
    zIndex: 0,
  },
  marginTopCards: {
    marginTop: 70,
  },
  FormContainerLeft: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  FormContainerLeft: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
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
  },
  darkButton: {
    height: FormHeight * 0.2,
    marginTop: FormHeight - 60,
    width: FormWidth * 0.15,
    borderRadius: 8,
    fontSize: Fonts.miniButtons,
    backgroundColor: "#3c3c3c",
    justifyContent: 'center',
    zIndex: 5,
    marginLeft: -100,
  },


  darkButtonText: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: Fonts.miniButtons,
  },
  blueButton: {
    height: FormHeight * 0.2,
    marginTop: FormHeight - 60,
    width: FormWidth * 0.15,
    borderRadius: 8,
    fontSize: Fonts.miniButtons,
    backgroundColor: Colors.blueLight,
    justifyContent: 'center',
    zIndex: 5,
    marginLeft: -200,
  },
  blueButtonText: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: Fonts.miniButtons,
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
  nameDriver: {
    marginTop: 10,

    marginLeft: -96,

    alignSelf: 'center',

    color: Colors.black,

    fontSize: 12,
  },
  picture: {
    alignSelf: 'center',
    height: 50,
    width: 40,
    marginTop:10,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
  },
  pictureContainer: {
    alignSelf: 'center',
    height: iconSize-40,
    width: iconSize-40,
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
  },
  priceDriver: {
    marginTop: 8,

    marginLeft: 3,

    fontSize: Fonts.subTitle,

    fontSize: Fonts.mainTitle,

    color: Colors.black,

    fontSize: Fonts.subTitle,
  },

  infoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: height * 0.08,
    height: 80,
    width: FormWidth,
    alignSelf: 'center',
    padding: 0,

    backgroundColor: Colors.blue,

    borderColor: Colors.blue,
    borderBottomColor: Colors.white,
    borderWidth: 1,
  },

  text: {
    position: 'absolute',

    marginBottom: height * 0.5,

    paddingLeft: width * 0.008, //3
    paddingTop: height * 0.005, //5
    paddingRight: width * 0.1, //25
  },

  pop: {
    fontSize: 14,

    color: Colors.white,
  },

  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    margin: 0,
  },
  FormContainer: {
    marginTop: 30,
    height: FormHeight-25,
    width: FormWidth+20,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  erase: {
    height: 22,
    width: 22,

    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'flex-end',

    marginLeft: width * 0.7, //250
    marginBottom: height * 0.001, //40
  },
});

export default Notifications;
