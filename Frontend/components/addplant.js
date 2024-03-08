import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const AddPlant = ({ onAddPlant }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setPlantName] = useState('');
  const [seuil, setPlantLimit] = useState('');

  const handleAddPlant = () => {
    // Perform any logic or API calls to add the plant here
    console.log('Adding plant:', name);
    console.log('Adding plant humidity limit:', seuil);

    // Reset the plant name and close the modal
    setPlantName('');
    setPlantLimit('');
    setModalVisible(false);

    // Pass the new plant data to the parent component
    onAddPlant({ name: name, seuil: seuil });

    fetch("http://192.168.67.180:3007/api/auth/plante/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name, seuil: seuil
      }),
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error("La réponse du réseau n'est pas valide");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Réponse du serveur :", data);
        })
        .catch((error) => {
          console.error(
              "Il y a eu un problème avec votre opération de fetch :",
              error
          );
        });

  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Add New Plant</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Plant</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter plant name"
            value={name}
            onChangeText={setPlantName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter plant humidity limit"
            value={seuil}
            onChangeText={setPlantLimit}
          />
          <TouchableOpacity onPress={handleAddPlant} style={styles.addPlantButton}>
            <Text style={styles.addPlantButtonText}>Add Plant</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#55EE77',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    width:370,
    marginLeft:17,
  },
  addButtonText: {
    marginLeft: 8,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addPlantButton: {
    backgroundColor: '#55EE77',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
  },
  addPlantButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPlant;