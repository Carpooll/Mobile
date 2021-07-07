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

class HomePassenger extends React.Component {
  render() {
    return (
      <ScrollView style={Styles.Container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={Styles.marginTopCards}>
        {/* This is the first card, you can use it to generate all the next cards */}
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
            <View style={Styles.FormContainerRight}>
              <Text style={Styles.nameDriver}>Personal data</Text>
              <Text style={Styles.priceDriver}>$1000</Text>
            </View>
            <TouchableOpacity style={Styles.darkButton}>
              <Text style={Styles.darkButtonText}>VIEW</Text>
            </TouchableOpacity>

          </View>


          {/* Here you need to insert the next cards, like this example */}
          {/* <View style={Styles.FormContainer}>
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
            <View style={Styles.FormContainerRight}>
              <Text style={Styles.nameDriver}>Personal data</Text>
              <Text style={Styles.priceDriver}>$1000</Text>
            </View>
            <TouchableOpacity style={Styles.darkButton}>
              <Text style={Styles.darkButtonText}>VIEW</Text>
            </TouchableOpacity>

          </View> */}
          



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

  nameDriver: {
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
    alignSelf: 'center',

    height: FormHeight * 0.2,

    marginTop: FormHeight - 16,

    width: FormWidth * .39,

    borderRadius: 8,

    fontSize: Fonts.miniButtons,

    backgroundColor: Colors.black,

    justifyContent: 'center',

    zIndex: 5,

    marginLeft: -100

    
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
