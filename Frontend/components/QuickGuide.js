import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const QuickGuide = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Ionicons name="book" size={24} color="white" />
        <Text style={styles.addButtonText}>QuickGuide</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>QuickGuide</Text>
          <ScrollView>
      <Text>AgroDigital Mobile App Guide</Text>

      <Text>1. Installation and Account Setup:</Text>
      <Text>- Download the AgroDigital mobile app from the App Store (iOS) or Google Play Store (Android).</Text>
      <Text>- Install the app on your mobile device.</Text>
      <Text>- Launch the app and create a new account or log in to your existing account.</Text>
      
      <Text>2. Connecting to the Arduino Irrigation System:</Text>
      <Text>- Ensure that your Arduino board is properly connected to the irrigation system hardware.</Text>
      <Text>- Connect your mobile device to the same Wi-Fi network as the Arduino board.</Text>
      <Text>- Open the AgroDigital app on your mobile device.</Text>
      
      <Text>3. Adding Plants:</Text>
      <Text>- In the AgroDigital app, navigate to the "Plants" section.</Text>
      <Text>- Tap on the "Add Plant" button.</Text>
      <Text>- Enter the details of the plant, such as its name, species, and desired moisture levels.</Text>
      <Text>- Save the plant information.</Text>

      <Text>4. Monitoring Plant Information:</Text>
      <Text>- In the AgroDigital app, go to the "Plants" section.</Text>
      <Text>- Select the plant you want to monitor.</Text>
      <Text>- View information about the plant, including its name, species, and current moisture level.</Text>
      <Text>- Monitor the moisture level and take necessary actions if it falls below the desired threshold.</Text>

      <Text>5. Viewing History:</Text>
      <Text>- Navigate to the "History" section in the AgroDigital app.</Text>
      <Text>- Access the historical data of each plant, including moisture levels and irrigation events.</Text>
      <Text>- Analyze the data to identify patterns or trends in plant moisture levels over time.</Text>

      <Text>6. Adjusting Settings:</Text>
      <Text>- Access the "Settings" section in the AgroDigital app.</Text>
      <Text>- Customize system settings such as desired moisture levels, irrigation intervals, and notification preferences.</Text>
      <Text>- Modify the settings according to your specific requirements.</Text>

      <Text>7. Additional Features:</Text>
      
      <Text>- Explore other features available in the AgroDigital mobile app, such as:</Text>
      <Text>- Automatic scheduling of irrigation based on plant needs and environmental factors.</Text>
      <Text>- Real-time notifications and alerts for critical moisture levels or system malfunctions.</Text>
      <Text>- Integration with weather data to adjust irrigation schedules based on rainfall predictions.</Text>
      <Text>- Remote access and control of the irrigation system through the AgroDigital mobile app.</Text>
    </ScrollView>
    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
          <Ionicons name="arrow-back" size={24} color="white" style={styles.closeButtonIcon} onPress={() => setModalVisible(false)} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#55EE77',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft:20,
    marginTop:20,

  },
  addButtonText: {
    marginLeft: 8,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#55EE77',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
    closeModalButton: {
    marginTop: 20,
    backgroundColor: '#55EE77',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  closeModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuickGuide;