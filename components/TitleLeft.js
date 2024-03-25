import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Design of left title
const TitleLeft = ({ title }) => {
  return (
    <View style={{ marginLeft: 20, flexDirection: "row" }}>
      <Image
        resizeMode="cover"
        source={require("../assets/highlight-05.png")}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default TitleLeft;
