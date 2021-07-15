/* FIGMA: Driver info (siendo ya passenger) */

import React from 'react';
import Colors from '../../res/Colors';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  InteractionManager,
} from 'react-native';
import Fonts from '../../res/Fonts';

/*
class DetailsPrivate extends React.Component {
  
    state = {
    data: {},
    carData: {},
  };

  componentDidMount() {
    this.getData();
  }
    
      
      getData = () => {
          const {item} = this.props.route.params;
          this.setState({data: item});
          this.props.navigation.setOptions({title: InteractionManager.name});
        };
    

  render() {
    const {data} = this.state;
    const {carData} = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <View>
            <View style={styles.imagesContainer}>
                <Image style={styles.profileImage} source={{uri: `${data.profile_image}`}} />
                <Image style={styles.mapImage} source={{ uri: 'https://i2.wp.com/hipertextual.com/wp-content/uploads/2020/04/hipertextual-mas-facil-durante-cuarentena-google-maps-muestra-que-restaurantes-envian-domicilio-2020815281.jpg?w=1500&ssl=1', }} />
            </View>
          </View>

          <View style={styles.formShadow}>
            <View style={styles.dataContainer}>
                <Text style={styles.textName}>{data.name || 'NAME'}</Text>
                <Text style={styles.titleLocation}>"Location"</Text>
                <Text style={styles.textAddress}>{data.address || 'ADDRESS'}</Text>
                <Text style={styles.titleCar}>"Car info"</Text>
                <Text style={styles.textPlates}>
                    {carData.plates || 'Car plates'}
                </Text>
                <Text style={styles.textModel}>{carData.model || 'MODEL'}</Text>
                <Text style={styles.textColor}>{carData.color || 'COLOR'}</Text>
            </View>
          </View>

            <TouchableOpacity
              style={styles.buttonDark}
              onPress={this.handlePress}>
              <Text style={styles.buttonDarkText}>Start ride</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}*/

class DetailsPrivate extends React.Component {
    render() {
      return (
        <ScrollView>
          <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <View>
              <View style={styles.imagesContainer}>
                <Image
                  style={styles.profileImage}
                  source={{
                      uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
                  }}></Image>
                <Image style={styles.mapImage} source={{ uri: 'https://i2.wp.com/hipertextual.com/wp-content/uploads/2020/04/hipertextual-mas-facil-durante-cuarentena-google-maps-muestra-que-restaurantes-envian-domicilio-2020815281.jpg?w=1500&ssl=1', }} />
              </View>
            </View>
            <View style={styles.formShadow}>
              <View style={styles.dataContainer}>
              <Text style={styles.textName}>Brayan Prieto</Text>
              <Text style={styles.titleLocation}>Location</Text>
              <Text style={styles.textAddress}>Las minas #3120, Mina</Text>
              <Text style={styles.titleCar}>Car info</Text>
              <Text style={styles.textPlates}>506-NH-HN</Text>
              <Text style={styles.textModel}>Mercedes- Benz</Text>
              <Text style={styles.textColor}>Black</Text>
              </View>
  
              <TouchableOpacity
                style={styles.buttonDark}
                onPress={this.handlePress}>
                <Text style={styles.buttonDarkText}>Start ride</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.blue,
      paddingTop: '48%',
      paddingBottom: '54.1%',
    },
  
    imagesContainer: {
      alignSelf: 'center',
      marginTop: -100,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12.0,
      elevation: 20,
  
  
      width: 110,
      height: 110,
      resizeMode: 'cover',
      borderRadius: 90,
      position: 'absolute',
  
      zIndex: 2,
    },
  
    profileImage: {
      marginTop: 10,
      width: 105,
      height: 105,
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 100,
  
      zIndex: 2,
    },
    mapImage:{
        alignSelf: 'center',
        width: '180%',
        height: '100%',
        marginTop: '150%',
    },
  
    titleLocation: {
      marginTop: '7%',
      marginBottom: '10%',
      alignSelf: 'center',
      color: Colors.blue,
      fontSize: Fonts.button,
  
    },
    titleCar: {
        marginTop: '65%',
        marginBottom: '4%',
        alignSelf: 'center',
        color: Colors.blue,
        fontSize: Fonts.button,
    
      },
    textName:{
        fontSize: 20,
        color: Colors.black,
        textAlign: 'center',
        marginTop: '-22%',
    },
    textAddress:{
        fontSize: Fonts.text,
        color: Colors.black,
        textAlign: 'center',
        marginTop: '-5%'
    },
    textPlates:{
        fontSize: Fonts.text,
        color: Colors.black,
        textAlign: 'center',
    },
    textModel:{
        fontSize: Fonts.text,
        color: Colors.black,
        textAlign: 'center',
        marginTop:'2%',
    },
    textColor:{
        fontSize: Fonts.text,
        color: Colors.black,
        textAlign: 'center',
        marginTop: '2%'
    },
  
    formShadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
  
      height: 480,
      marginTop: -30,
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
      backgroundColor: Colors.white,
      width: 265,
      borderRadius: 15,
      alignSelf: 'center'
    },
  
    dataContainer: {
      paddingTop: 130,
      alignSelf: 'center'
    },
  
    form: {
      paddingHorizontal: 20,
      color: Colors.black,
      borderBottomColor: Colors.black,
      borderBottomWidth: 1,
      marginBottom: 30,
      width: 180,
      textAlign: 'center',
      alignSelf: 'center'
    },
  
    buttonDark: {
      width: 193,
      padding: 15,
      marginTop: 450,
      borderRadius: 15,
      backgroundColor: Colors.black,
      borderColor: Colors.black,
      borderWidth: 1,
      alignSelf: 'center',
      zIndex: 5,
      position: 'absolute',
    },
  
    buttonDarkText: {
      textAlign: 'center',
      fontSize: Fonts.button,
      paddingHorizontal: 25,
      color: Colors.white,
    },
  });

export default DetailsPrivate;
