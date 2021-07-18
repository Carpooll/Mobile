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
} from 'react-native';
import Fonts from '../../res/Fonts';
import Colors from '../../res/Colors';

class HomeDriver extends React.Component {

  handleUser = () => {
    this.props.navigation.replace('PassengerPublicProfile')
  }

  render() {
    const { item } = this.props;
    return (
      <ScrollView style={Styles.Container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={Styles.marginTopCard}>
          <View style={Styles.infoContainer}>
            <View style={Styles.imageContainer}>
              <Image
                style={Styles.image}
                source={{
                  uri: 'https://images.unsplash.com/photo-1624759314986-43bee161a691?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMzfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                }}
              />
            </View>
            <Text style={Styles.userName}>Brayan Prieto</Text>

            {/* Add an alert here */}
            <View style={Styles.buttons}>
              <TouchableOpacity style={Styles.darkButton}>
                <Text style={Styles.darkButtonText}>DELETE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.blueButton} onPress={this.handleUser}>
                <Text style={Styles.blueButtonText}>SEE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var iconSize = height * 0.12;
var FormWidth = width * 0.8;

const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.blue,
    position: 'relative',
    zIndex: 0,
  },

  marginTopCard: {
    marginTop: 80,
  },

  infoContainer: {
    display: 'flex',
    height: 110,
    width: FormWidth,
    alignSelf: 'center',
    padding: 'auto',
    backgroundColor: Colors.white,
    borderRadius: 15,
    position: 'relative',
    marginBottom: 50,
  },
  image: {
    height: iconSize,
    width: iconSize,
    borderRadius: iconSize / 2,
  },
  imageContainer: {
    height: iconSize,
    width: iconSize,

    marginTop: 10,
    marginLeft: 20,

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

    marginTop: height * 0.03,
    marginLeft: 135,

    color: Colors.button,
    fontSize: 20,
  },

  buttons: {
    width: 165,
    height: 40,

    justifyContent: 'center',
  },

  darkButton: {
    height: 20,
    width: 75,

    marginLeft: 135,

    borderRadius: 15,

    fontSize: Fonts.miniButtons,
    backgroundColor: Colors.black,

    justifyContent: 'center',

    zIndex: 2,

    position: 'absolute',
  },

  darkButtonText: {
    alignSelf: 'center',
    color: Colors.white,
  },

  blueButton: {
    height: 20,
    width: 75,

    marginLeft: 225,

    borderRadius: 15,

    fontSize: Fonts.miniButtons,
    backgroundColor: Colors.blue,

    justifyContent: 'center',

    zIndex: 2,

    position: 'absolute',
  },

  blueButtonText: {
    alignSelf: 'center',
    color: Colors.white,
  },
});

export default HomeDriver;
