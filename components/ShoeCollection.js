import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  selectCustomerId,
  selectShoeCollectionId,
} from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import shoeCollectionService from "../api/shoeCollectionService";

// Component to display a shoe in ProfileScreen
const ShoeCollection = ({ shoe, refresh }) => {
  // Recuperation of the current state of the store
  const customerId = useSelector(selectCustomerId);
  const ShoeCollectionId = useSelector(selectShoeCollectionId);

  // Fonction to remove a shoe from shoe collection
  const removeShoe = async () => {
    try {
      // Initialisation of the data to send to the API
      // Check API documentation to know the convention
      const data = {
        Id: ShoeCollectionId,
        CustomerId: customerId,
        ShoeId: shoe.id,
        Type: 1,
      };
      // Request
      await shoeCollectionService.PutShoeCollection(ShoeCollectionId, data);
      // We refresh the component to update its rendered
      refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.bagShoeContainer}>
      <View style={styles.bagShoeImage}>
        <Image
          source={{ uri: shoe.image }}
          style={styles.shoeImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.bagShoeInfos}>
        <Text style={styles.bagShoeName}>{shoe.name}</Text>
        <Text style={styles.bagShoePrice}>${shoe.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeShoe()}>
        <Image
          style={styles.bagShoeBin}
          resizeMode="cover"
          source={require("../assets/trash-2.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bagShoeContainer: {
    marginTop: 40,
    flex: 1,
    flexDirection: "row",
  },
  bagShoeImage: {
    width: 122,
    height: 122,
    marginLeft: 20,
    marginRight: 20,
  },
  shoeImage: {
    width: "95%",
    height: "95%",
    borderRadius: 25,
  },
  bagShoeInfos: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bagShoeName: {
    marginTop: 20,
  },
  bagShoePrice: {
    marginBottom: 30,
  },
  bagShoeBin: {
    marginTop: 20,
    marginLeft: 20,
  },
});

export default ShoeCollection;
