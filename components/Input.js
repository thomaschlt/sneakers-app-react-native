import React from "react";
import { TextInput, StyleSheet } from "react-native";

// Input design for the different forms
const Input = ({ placeholder, onChangeText, secureTextEntry = false }) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6B6B6B"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.textInput}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    alignSelf: "center",
    width: "80%",
    height: 40,
    marginVertical: 20,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    fontSize: 26,
    textAlign: "center",
  },
});
export default Input;
