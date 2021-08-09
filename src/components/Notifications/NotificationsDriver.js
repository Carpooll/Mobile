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
  Alert,
  TouchableOpacity,
} from 'react-native';
import Fonts from '../../res/Fonts';
import Storage from '../../Libs/Storage';
import Colors from '../../res/Colors';

// NEEDS TO CHANGE TO DYNAMIC DATA
var FormHeight = 125;
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var iconSize = height * 0.135;
var borderTop = height * 0.12;
var FormWidth = width * 0.8;

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
      //console.log(response.results);
      this.setState({notifications: notifications});

      const {markers} = this.state;

      for (var i = 0; i < notifications.length; i++) {
        let notification = {
          title: notifications[i].title,
          text: notifications[i].text,
          passenger_id: notifications[i].sender,
          id_notification: notifications[i].id,
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

  deniedRequest = async (id_notification) => {
      
    Alert.alert(
        'Denied passenger request.',
        `Are you sure you want to reject the request?\n\nThis action can't be undone.`,
        [
          {
            text: 'Reject passenger',
            onPress: async () => {
              try {
                token = await Storage.instance.get('token');
  
                let body = {status: 'rejected'};
                let request = await fetch(
                  `https://carpool-utch.herokuapp.com/requests/${id_notification}/`,
                  {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: 'Token ' + token,
                    },
                    body: JSON.stringify(body),
                  },
                );
                let response = await request.json();
                
              } catch (err) {
                console.log('reject pass', err);
                throw Error(err);
              }
            },
          },
          {
          text: 'cancel'
          }
        ],
        {
          cancelable: true,
        },
      );
  };

  acceptRequest = async id_notification => {
    Alert.alert(
      'Accept passenger.',
      `Are you sure you want to accept this passenger?\n\nThis action can't be undone.`,
      [
        {
          text: 'Accept passenger',
          onPress: async () => {
            try {
              token = await Storage.instance.get('token');

              let body = {status: 'accept'};
              let request = await fetch(
                `https://carpool-utch.herokuapp.com/requests/${id_notification}/`,
                {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + token,
                  },
                  body: JSON.stringify(body),
                },
              );
              let response = await request.json();
              if(response){
                this.getNotifications()
              }
              //console.log(response);
            } catch (err) {
              console.log('accept pass', err);
              throw Error(err);
            }
          },
        },
        {
        text: 'cancel'
        }
      ],
      {
        cancelable: true,
      },
    );
  };

  //see passenger sending request
  seePassenger = async passenger_id => {
    token = await Storage.instance.get('token');

    let request = await fetch(
      `https://carpool-utch.herokuapp.com/passengers/${passenger_id}/`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Token ' + token,
        },
      },
    );

    let response = await request.json();
    let passenger = await response;

    Alert.alert(
      'Passenger',
      `${passenger.first_name} ${passenger.last_name} is a ${passenger.distance} km from you.\n\nAccept the ride to see the location.`,
      [
        {
          text: 'Close',
        },
      ],
      {
        cancelable: true,
      },
    );
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
                        uri: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2018/08/fotos-perfil-whatsapp_16.jpg?itok=fl2H3Opv',
                      }}
                    />
                  </View>
                </View>
                <View key={index} style={Styles.FormContainerRight}>
                  <Text style={Styles.nameDriver}>{marker.title}</Text>
                  <Text style={Styles.priceDriver}>{marker.text}</Text>
                </View>
                <TouchableOpacity
                  style={Styles.blueButton}
                  onPress={() => this.acceptRequest(marker.id_notification)}>
                  <Text style={Styles.blueButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.darkButton}
                  onPress={() => this.seePassenger(marker.passenger_id)}>
                  <Text style={Styles.darkButtonText}>See</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.redButton}
                  onPress={() => this.deniedRequest(marker.id_notification)}>
                  <Text style={Styles.blueButtonText}>Denied</Text>
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

var FormWidth = width * 0.8;

const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.blue,
    position: 'relative',
    zIndex: 0,
  },

  darkButton: {
    height: FormHeight * 0.2,
    marginTop: FormHeight - 16,
    width: FormWidth * 0.15,
    borderRadius: 8,
    fontSize: Fonts.miniButtons,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    zIndex: 5,
    marginLeft: -40,
  },
  redButton: {
    height: FormHeight * 0.2,
    marginTop: FormHeight - 16,
    width: FormWidth * 0.15,
    borderRadius: 8,
    fontSize: Fonts.miniButtons,
    backgroundColor: '#8C0503',
    justifyContent: 'center',
    zIndex: 5,
    marginLeft: -102,
  },

  darkButtonText: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: Fonts.miniButtons,
  },
  blueButton: {
    height: FormHeight * 0.2,
    marginTop: FormHeight - 16,
    width: FormWidth * 0.15,
    borderRadius: 8,
    fontSize: Fonts.miniButtons,
    backgroundColor: Colors.blueLight,
    justifyContent: 'center',
    zIndex: 5,
    marginLeft: -150,
  },
  blueButtonText: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: Fonts.miniButtons,
  },
  FormContainerLeft: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  nameDriver: {
    marginTop: 20,

    marginLeft: 30,

    alignSelf: 'center',

    color: Colors.black,

    fontSize: 13,
  },

  priceDriver: {
    marginTop: 20,

    marginLeft: 30,

    fontSize: Fonts.subTitle,

    fontSize: Fonts.mainTitle,

    color: Colors.black,

    fontSize: Fonts.subTitle,
  },
  FormContainerRight: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
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

  erase: {
    height: 22,
    width: 22,

    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'flex-end',

    marginLeft: width * 0.7, //250
    marginBottom: height * 0.001, //40
  },
  marginTopCards: {
    marginTop: 70,
  },
});

export default Notifications;
