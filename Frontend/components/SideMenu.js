import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import PlantsScreen from "../screens/PlantsScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatBotScreen from "../screens/ChatBotScreen";
import SettingsScreen from "../screens/Settings";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const Tab = createBottomTabNavigator();


const SideMenu = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Plants") {
            iconName = focused ? "leaf" : "leaf-outline";
          } else if (route.name === "Chatbot") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={activeColors.accent} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: activeColors.accent,
        inactiveTintColor: activeColors.text,
        style: {
          backgroundColor: activeColors.accent,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Plants" component={PlantsScreen} />
      <Tab.Screen name="Chatbot" component={ChatBotScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#55EE77",
  },
  sidebarItem: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sidebarItemText: {
    fontSize: 16,
  },
});

export default SideMenu;