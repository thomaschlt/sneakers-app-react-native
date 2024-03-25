import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { selectCustomerId, selectBagId } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import bagService from "../api/bagService";

// Component to display a shoe in BagScreen
const BagShoe = ({ shoe, refresh }) => {
  // Recuperation of the current state of the store
  const customerId = useSelector(selectCustomerId);
  const bagId = useSelector(selectBagId);

  // Fonction to remove a shoe from bag
  const removeShoe = async () => {
    try {
      // Initialisation of the data to send to the API
      // Check API documentation to know the convention
      const data = {
        Id: bagId,
        CustomerId: customerId,
        ShoeId: shoe.id,
        Type: 1,
      };
      // Request
      await bagService.PutBag(customerId, data);
      // We refresh the component to update its rendered
      refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.bagShoeContainer}>
      <View style={styles.bagShoeImage}>
        <Image style={styles.shoeImage} source={{ uri: shoe.image }} />
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
  shoeImage: {
    width: "95%",
    height: "95%",
    borderRadius: 25,
  },
  bagShoeImage: {
    width: 122,
    height: 122,
    marginLeft: 20,
    marginRight: 20,
  },
  bagShoeInfos: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bagShoeName: {
    marginTop: 20,
    fontSize: 16,
  },
  bagShoePrice: {
    marginBottom: 30,
  },
  bagShoeBin: {
    marginTop: 20,
    marginLeft: 20,
  },
});

export default BagShoe;
