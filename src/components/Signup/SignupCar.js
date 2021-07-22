import React from 'react';
import Colors from '../../res/Colors';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Fonts from '../../res/Fonts';


class SignupCar extends React.Component {

  handlePress = () => {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <View>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={{
                    uri: 'https://image.flaticon.com/icons/png/512/3448/3448650.png',
                }}></Image>
            </View>
          </View>
          <View style={styles.formShadow}>
            <View style={styles.inputContainer}>
            <Text style={styles.title}>Car information</Text>
              <TextInput
                style={styles.form}
                placeholder="Model"
                placeholderTextColor={Colors.black}
                // onChangeText={text => { esq no sabemos si se usa unu
                //     this.setState(prevState =>{
                //         let form = Object.assign({}, prevState.form);
                //         form.name = text;
                //         return {form};
                //     })
                // }}
              />
              <TextInput
                style={styles.form}
                placeholder="Color"
                placeholderTextColor={Colors.black}
                // onChangeText={text => {
                //     this.setState(prevState =>{
                //         let form = Object.assign({}, prevState.form);
                //         form.name = text;
                //         return {form};
                //     })
                // }}
              />
              <TextInput
                style={styles.form}
                placeholder="Plates"
                placeholderTextColor={Colors.black}
                // onChangeText={text => {
                //     this.setState(prevState =>{
                //         let form = Object.assign({}, prevState.form);
                //         form.name = text;
                //         return {form};
                //     })
                // }}
              />
              <TextInput
                style={styles.form}
                placeholder="Insurance police"
                placeholderTextColor={Colors.black}
                // onChangeText={text => {
                //     this.setState(prevState =>{
                //         let form = Object.assign({}, prevState.form);
                //         form.name = text;
                //         return {form};
                //     })
                // }}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonDark}
              onPress={this.handlePress}>
              <Text style={styles.buttonDarkText}>Next</Text>
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

  logoContainer: {
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

    backgroundColor: Colors.white,

    width: 110,
    height: 110,
    resizeMode: 'cover',
    borderRadius: 90,
    position: 'absolute',

    zIndex: 2,
  },

  logo: {
    width: 105,
    height: 105,
    justifyContent: 'center',
    alignSelf: 'center',

    zIndex: 2,
  },

  title: {
    marginTop: '-25%',
    marginBottom: '10%',
    alignSelf: 'center',
    color: Colors.blue,
    fontSize: Fonts.button,

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

  inputContainer: {
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

export default SignupCar;
