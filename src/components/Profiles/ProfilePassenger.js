import React from 'react';
import Colors from '../../res/Colors';
import {
    Text,
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
 
} from 'react-native';
import Fonts from '../../res/Fonts';

class PassengerPublicProfile extends React.Component {
    render() {
        return (   

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
                            <View style={styles.datacont}>
                               
                                <Text style={styles.phone}>614-245-6505</Text>
                               
                            </View>
                            <Text style={styles.title}>Address:</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.buttonDark}
                            onPress={this.handlePress}>
                            <Text style={styles.buttonDarkText}>ACCEPT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
       
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.blue,
        paddingTop: '48%',
        paddingBottom: '84.1%',
    },

    imagesContainer: {
        alignSelf: 'center',
        marginTop: -100,
        shadowColor: '#202020',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
        elevation: 15,
        borderColor: Colors.white,


        width: 110,
        height: 110,
        resizeMode: 'cover',
        borderRadius: 90,
        position: 'absolute',

        zIndex: 2,
    },

    profileImage: {
        width: 110,
        height: 110,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 100,

        zIndex: 2,
    },
    mapImage: {
        alignSelf: 'center',
        width: '180%',
        height: '100%',
        marginTop: '160%',
        borderRadius: 15,

        
    },

    title: {
        alignSelf: 'center',
        color: Colors.blue,
        fontSize: Fonts.button,
    

    },
    textName: {
        alignSelf: 'center',
        marginTop: 0,
        color: Colors.black,
        fontSize: Fonts.button,
      
    },
    
    
    formShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },

        height: 400,
        marginTop: -30,
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        backgroundColor: Colors.white,
        width: 261,
        borderRadius: 15,
        alignSelf: 'center'
    },

    dataContainer: {
        paddingTop: 65,
        alignSelf: 'center'
    },
    datacont:{
        fontSize: Fonts.text,
        color: Colors.black,
        textAlign: 'center',
    
        alignItems: 'center',
        marginBottom: '-3%'
    },

    form: {
        paddingHorizontal: 20,
        color: Colors.black,
        borderBottomColor: Colors.black,
        borderBottomWidth: 1,
        marginBottom: 30,
        width: 150,
        textAlign: 'center',
        alignSelf: 'center'
    },

    buttonDark: {
        width: 193,
        padding: 15,
        marginTop: 370,
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
    schooId: {
        marginBottom: '4%'
    },
    phone: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 50,
        borderBottomColor: Colors.black,
        width: 150,
      
    },
   
});

export default PassengerPublicProfile;