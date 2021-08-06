/* FIGMA: Driver info public) */

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

class DetailsPublic extends React.Component {
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
               </View>
            </View>
            <View style={styles.formShadow}>
              <View style={styles.dataContainer}>
              <Text style={styles.textName}>Brayan Prieto</Text>
              <Text style={styles.textNumber}>6145220011</Text>
              </View>
              <TouchableOpacity
                style={styles.buttonDark}
                onPress={this.handlePress}>
                <Text style={styles.buttonDarkText}>Ask to be my driver</Text>
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
      paddingBottom: '113%',
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
    textName:{
        textAlign:'center',
        fontSize:25,
        marginTop:-40,
        marginBottom:5,
    },
    textNumber:{
        textAlign:'center',
        fontSize:20,
        
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
  
    formShadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
  
      height: 250,
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
      textAlign: 'center',
      alignSelf: 'center',
    },
  
    buttonDark: {
      width: 193,
      padding: 15,
      marginTop: 210,
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

export default DetailsPublic;
