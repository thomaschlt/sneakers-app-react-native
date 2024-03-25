import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { selectCustomerId, selectBagId } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import bagService from "../api/bagService";
import GoBack from "../components/GoBack";
import Feedback from "../components/Feedback";
import GoToBag from "../components/GoToBag";
import ActionButton from "../components/ActionButton";

export default DetailsScreen = ({ navigation, route }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Recuperation of the current state of the store
  const customerId = useSelector(selectCustomerId);
  const bagId = useSelector(selectBagId);

  // Function to add a shoe to the bad
  const addShoeToBag = async () => {
    setLoading(true);
    setError(null);
    try {
      // Initialisation of the data to send to the API
      // Check API documentation to know the convention
      const data = {
        Id: bagId,
        CustomerId: customerId,
        ShoeId: route.params.id,
        Type: 0,
      };
      // Request
      await bagService.PutBag(customerId, data);
      Alert.alert("you added a shoe to your bag");
      navigation.navigate("Home");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(error);
      setLoading(false);
    }
  };

  // Deal with loading and errors
  Feedback(loading, error);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <GoBack />
        <Image
          style={styles.rating}
          resizeMode="cover"
          source={require("../assets/rating.png")}
        />
        <GoToBag />
      </View>

      {/* Image of the choosen shoe */}
      <View style={styles.shoeImageContainer}>
        <Image
          style={styles.shoeImage}
          resizeMode="cover"
          source={{ uri: route.params.image }}
        />
      </View>

      {/* Display informations of the shoe */}
      <View style={styles.infosContainer}>
        <View style={styles.infosTextContainer}>
          <Text style={styles.shoeBrand}>{route.params.brand}</Text>
          <Text style={styles.shoeName}>{route.params.name}</Text>
          <Text style={styles.shoeType}>Men's Running Shoe</Text>
        </View>
        <View style={styles.priceContainer}>
          <ImageBackground
            source={require("../assets/ellipse-3.png")}
            resizeMode="cover"
            style={styles.priceBackground}
          >
            <Text style={styles.priceText}>${route.params.price}</Text>
          </ImageBackground>
        </View>
      </View>
      <View style={styles.separatorLine}></View>
      <View style={styles.shoeDescriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          These shoes are a popular choice of footwear for athletes, fashion
          enthusiasts and everyday wearers alike.{" "}
        </Text>
      </View>
      <ActionButton action={addShoeToBag} title="Add to Cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  topBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },
  shoeImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
  shoeImage: {
    width: 300,
    height: 300,
  },
  shoeDescriptionContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionText: {
    marginVertical: 10,
  },
  infosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  shoeBrand: {
    color: "#888E9A",
    fontSize: 20,
  },
  shoeName: {
    fontSize: 20,
  },
  shoeType: {
    fontSize: 16,
    color: "#888E9A",
  },
  priceBackground: {
    width: 78,
    height: 66,
    justifyContent: "center",
    alignItems: "center",
  },
  priceText: {
    fontSize: 18,
  },
  separatorLine: {
    borderWidth: 0.5,
    marginHorizontal: 20,
    borderColor: "#888E9A",
  },
});
