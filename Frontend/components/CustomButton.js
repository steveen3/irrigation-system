import { Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../config/theme";

export default function CustomButton({ label, onPress }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: activeColors.accent,
        padding: 20,
        marginLeft: 80,
        width:200,
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 16,
          color: "#fff",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
