import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import WaterButton from "../components/WaterButton";
import HumidityIndicator from "../components/humidityIndicator";
import HumidityGraph from '../components/humidityGraph';
import Ionicons from "react-native-vector-icons/Ionicons";
import AddPlant from "../components/addplant";

const PlantsScreen = (route) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const navigation = useNavigation();

  // Sample data for the cards
  const [plants, setPlants] = useState([
    { name: 'Leeks', image: require('../images/leek.png') },
    { name: 'Tomato', image: require('../images/tomato.png') },
    { name: 'Hibiscus', image: require('../images/hibiscus.png') },
  ]);

  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isPumpOn, setIsPumpOn] = useState(false);

  
    const renderPlantModal = () => {
      if (!selectedPlant) return null;
    
      return (
        <ScrollView>
          <Modal visible={selectedPlant !== null} animationType="slide">
            <View style={[styles.modalContainer, { backgroundColor: activeColors.accent }]}>
              <TouchableOpacity style={styles.returnButton} onPress={() => setSelectedPlant(null)}>
                <Ionicons
                  name="arrow-back"
                  size={20}
                  color={activeColors.text}
                  style={styles.returnButtonIcon}
                />
                <Text style={[styles.plantName, { color: activeColors.text, fontWeight: 'bold' }]}>
                  {selectedPlant.name}
                </Text>
              </TouchableOpacity>
    
              <View style={styles.plantInfoContainer}>
                <Image source={selectedPlant.image} style={styles.modalImage} />
                <View style={styles.imageAndButtonContainer}>
                  <HumidityIndicator />
                </View>
                <WaterButton />
                <HumidityGraph />
              </View>
            </View>
          </Modal>
        </ScrollView>
      );
    };
  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const handleDeletePlant = (index) => {
    const deletedPlant = plants[index]; // Get the plant being deleted
    const updatedPlants = [...plants];
    updatedPlants.splice(index, 1);
    setPlants(updatedPlants);
  };

  const handlePlant = (plant) => {
    fetch('http://192.168.67.180:3007/plante/arrosee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name: plant.name }),
 
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Watering response:', data);
        console.log(plant)
        // Handle the response from the server if needed
      })
      .catch((error) => {
        console.error('Error watering plant:', error);
        // Handle the error if needed
      });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: activeColors.primary,
      }}
    >
      {plants.map((plant, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.cardContainer, { backgroundColor: '#55EE77' }]}
          onPress={() => {
            setSelectedPlant(plant);
            handlePlant(plant);
          }}
        >
          <View style={styles.cardContent}>
            <Image
              source={plant.image}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>{plant.name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeletePlant(index)}
            >
              <Ionicons
                name="trash"
                size={20}
                color={activeColors.text}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
      <AddPlant onAddPlant={handleAddPlant} />
      {renderPlantModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  returnButton: {
    position: "absolute",
    top: 40,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },
  returnButtonIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  modalImage: {
    marginTop:100,
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  plantInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  plantName: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 5,
    color: '#ffffff',
  },
  imageAndButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 52,
  },
  deleteButton: {
    marginLeft: 60,
  },
});

export default PlantsScreen;