import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Arrow to make available the go back navigation
const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        resizeMode="cover"
        source={require("../assets/chevron-left.png")}
      />
    </TouchableOpacity>
  );
};

export default GoBack;
