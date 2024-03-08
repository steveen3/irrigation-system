import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

const HumidityGraph = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const humidityData = [
    { day: 'Mon', humidity: 50 },
    { day: 'Tue', humidity: 51 },
    { day: 'Wed', humidity: 55 },
    { day: 'Thu', humidity: 56 },
    { day: 'Fri', humidity: 52 },
    { day: 'Sat', humidity: 54.20 },
    { day: 'Sun', humidity: 55.88 },
  ];

  const labels = humidityData.map((item) => item.day);
  const values = humidityData.map((item) => item.humidity);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Set the line color
        strokeWidth: 2, // Set the line width
      },
    ],
  };

  return (
    <View>
      <Text style={styles.title}>This week</Text>
      <LineChart
        data={data}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Set the axis label color
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Set the dataset label color
        }}
        bezier // Use Bezier curve for the line
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default HumidityGraph;