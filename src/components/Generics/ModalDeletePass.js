import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Colors from '../../res/Colors';

const ModalDeletePass = () => {
  handleDelete = () => {
    console.log('passenger deleted');
  };
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this passenger?
            </Text>
            <Pressable
              style={styles.buttonNo}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle2}>No</Text>
            </Pressable>
            <Pressable style={styles.buttonYes} onPress={() => handleDelete()}>
              <Text style={styles.textStyle2}>Yes</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.blueButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.blueButtonText}>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },

  buttonNo: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginBottom: 8,
    backgroundColor: Colors.blue,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  textStyle2: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonYes: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: Colors.black,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  blueButton: {
    height: 15,
    width: 50,
    marginLeft: -20,
    marginTop: -23,
    borderRadius: 3,
    backgroundColor: '#bdbdbd',
    zIndex: 2,
    marginBottom: 13,
  },
  blueButtonText: {
    alignSelf: 'center',
    color: '#e0e0e0',
    fontSize: 12,
  },
});

export default ModalDeletePass;
