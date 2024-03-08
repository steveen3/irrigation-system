import React, { useContext, useState, useRef } from "react";
import { View, ScrollView, Text, Image } from "react-native";
import { StyleSheet } from "react-native";

import moment from "moment";
import QuickGuide from "../components/QuickGuide";

const HomeScreens = ({ navigation }) => {
  const currentTime = moment().format("HH:mm:ss");
  const [username, setFullName] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Add code for refreshing data
    setRefreshing(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          {/* Add your header content here */}
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../images/growing.png")}
            style={{
              height: 400,
              width: 600,
              borderBottomLeftRadius:200,
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.bottomText}>                        Good</Text>
            {currentTime >= "06:00:00" && currentTime <= "12:00:00" ? (
              <Text style={styles.bottomText1}>Morning,         User</Text>
            ) : currentTime >= "12:00:00" && currentTime <= "18:00:00" ? (
              <Text style={styles.bottomText1}>Morning,         User</Text>
            ) : (
              <Text style={styles.bottomText1}>Evening,         User</Text>
            )}
            <QuickGuide></QuickGuide>
          </View>
          <Image
            source={require("../images/home2.png")}
            style={{
              marginTop:100,
              height: 218,
              width: 500,
              borderBottomLeftRadius:150,
              transform: [{ rotate: '180deg' }],
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
  },

  textContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    alignItems: "flex-start", // Updated style
  },
  bottomText: {
    color: '#ffffff',
    marginLeft: 15,
    fontSize: 52,
    fontWeight: "bold",
  },
  bottomText1: {
    color: '#ffffff',
    fontSize: 52,
    marginLeft: 15,
    fontWeight: "bold",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
  },
  scrollView: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreens;