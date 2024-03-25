import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Bouton you can select to filter shoe by brand
const BrandCard = ({ brand, isSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.brandCard, isSelected && styles.selectedBrandCard]}>
        <Text
          style={[styles.brandName, isSelected && styles.selectedBrandName]}
        >
          {brand}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  brandCard: {
    width: 80,
    height: 40,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "black",
    marginRight: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBrandCard: {
    backgroundColor: "black",
  },
  brandName: {
    fontSize: 18,
  },
  selectedBrandName: {
    color: "white",
  },
});

export default BrandCard;
