import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import InputField from "../components/InputField";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";

const RegisterScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const [username, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('fullName:', username);
    console.log('email:', email);
    console.log('password:', password);

    // Reset the full name and password
    setFullName('');
    setEmail('');
    setPassword('');

    // Send the login data to the server
    fetch("http://192.168.67.180:3007/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("The network response was not valid");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Server response:", data);
        navigation.navigate("SideMenu");
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: activeColors.primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25, marginTop: 50 }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../images/login.png")}
            style={{
              marginTop: 10,
              marginLeft: 8.5,
              height: 250,
              width: 350,
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: activeColors.tint,
            marginBottom: 30,
          }}
        >
          Register
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => { }}
            style={{
              backgroundColor: activeColors.secondary,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image
              source={require("../images/google.png")}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              backgroundColor: activeColors.secondary,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image
              source={require("../images/facebook.png")}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              backgroundColor: activeColors.secondary,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image
              source={require("../images/apple.png")}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            textAlign: "center",
            color: activeColors.tint,
            marginBottom: 30,
          }}
        >
          Or, register with email ...
        </Text>

        <InputField
          label={"Full Name"}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={username}
          onChangeText={setFullName}
        />

        <InputField
          label={"Email ID"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="lock-closed"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton label={"Resgister"} onPress={handleRegister} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ color: activeColors.tint }}>Already registered? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: activeColors.accent, fontWeight: "700" }}>
              {" "}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
