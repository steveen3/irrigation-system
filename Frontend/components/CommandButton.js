import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const CommandButton = () => {
  const [isLedOn, setIsLedOn] = useState(false);

  const toggleLed = async (value) => {
    try {
      const response = await fetch(
        `http://192.168.43.143:3007/${value ? 'allumer' : 'eteindre'}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: 'Hello, server!' }),
        }
      );

      if (response.ok) {
        setIsLedOn(value);
        console.log(`La pompe est ${value ? 'allumée' : 'éteinte'}.`);
      } else {
        console.log('Erreur lors de la communication avec le serveur.');
      }
    } catch (error) {
      console.error('Erreur lors de la communication avec le serveur:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Switch
        style={styles.switch}
        value={isLedOn}
        onValueChange={toggleLed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    transform: [{ scale: 2 }], // Adjust the scale value as per your preference
  },
});

export default CommandButton;