import React, { useState, useContext } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../config/theme';
import { ThemeContext } from '../context/ThemeContext';

const ChatBotScreen = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const navigation = useNavigation();
  const [isChatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleChatButtonPress = () => {
    setChatOpen(true);
  };

  const handleMessageSend = () => {
    // Logic to handle the message sent by the user
    // You can implement your chatbot functionality here
    // For simplicity, I'm just logging the message
    console.log('User Message:', message);

    // Clearing the input field
    setMessage('');
  };

  return (
    <ImageBackground source={require('../images/chat.png')} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to the Baotanic Chatbot</Text>
        <TouchableOpacity
          style={[styles.chatButton, { backgroundColor: activeColors.accent }]}
          onPress={handleChatButtonPress}
        >
          <Text style={styles.buttonText}>Chat with the Assistant</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isChatOpen} animationType="slide" transparent={true}>
        <View style={styles.chatboxContainer}>
          <View style={styles.chatboxContent}>
            <TouchableOpacity onPress={() => setChatOpen(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

            <View style={styles.chatMessages}>{/* Display chat messages here */}</View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type your message..."
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={handleMessageSend}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleMessageSend}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  chatButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  chatboxContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  chatboxContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  chatMessages: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatBotScreen;