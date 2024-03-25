import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// Component to normalize the style of a button to lauch an action
const ActionButton = ({ action, title }) => {
  return (
    <TouchableOpacity style={styles.bouton} onPress={() => action()}>
      <Text style={styles.text}>{title}</Text>
      <Image source={require("../assets/chevron-right.png")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bouton: {
    marginTop: 20,
    marginBottom: 35,
    backgroundColor: "#DAE2F8",
    flexDirection: "row",
    width: 302,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 30,
  },
});

export default ActionButton;
