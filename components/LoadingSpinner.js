import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

// Spinner in the center of the screen
const LoadingSpinner = () => {
  <View style={styles.loadingContainer}>
    <Text>Loading...</Text>;
    <ActivityIndicator size="large" style={styles.indicator} />;
  </View>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingSpinner;
