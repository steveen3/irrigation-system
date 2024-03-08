import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native';

const values = ['Tomato', 'Patato', 'Rice'];

const SelectPlant = () => {
  const [selectedValue, setSelectedValue] = useState(values[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:3000/api/plantChoice/${selectedValue}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedValue,
      }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();
    console.log(data);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>{selectedValue}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {values.map((value, index) => (
              <TouchableOpacity key={index} onPress={() => { setSelectedValue(value); setModalVisible(false); }}>
                <Text style={styles.modalText}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default SelectPlant;