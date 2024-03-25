import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Icon to go to bag screen
const GoToBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Bag")}>
      <Image
        style={{ marginRight: 20 }}
        source={require("../assets/iconcart.png")}
      />
    </TouchableOpacity>
  );
};

export default GoToBack;
