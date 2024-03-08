import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const SERVER_URL = "http://192.168.67.180:3007";

const HumidityIndicator = () => {
  const [humidity, setHumidity] = useState(0);
// const [status, setStatus] = useState(null);


  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on("update", (data) => {
      setHumidity(data.humidity);
      // showNotification(data.status); 
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // const showNotification = (message) => {
  //   Toast.show({
  //     text1: 'Status Update',
  //     text2: message,
  //     visibilityTime: 1000,
  //     autoHide: true,
  //     bottomOffset: 40,
  //     position: 'top',
  //     type: 'info',
  //     width:400,
  //   });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="water" size={24} color="#333333" />
        <View>
        <Text style={styles.title}>Soil humidity</Text>
      </View>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}

      </View>

      <View style={styles.valueContainer}>
        {humidity ? (
          <Text style={styles.value}>{humidity}%</Text>
        ) : (
          <Text style={styles.loading}>loading...</Text>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,

  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,

    },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  valueContainer: {
    backgroundColor: '#ffffff',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  value: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 32,
  },
  loading: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 32,
  },
});

export default HumidityIndicator;