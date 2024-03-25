import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Component to display a shoe in HomeScreen
const ShoeCard = ({ shoe }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", shoe)}>
      <View style={styles.shoecard}>
        <View style={styles.shoeReference}>
          <Image
            style={styles.shoeImage}
            resizeMode="cover"
            source={{ uri: shoe.image }}
          />
          <Text style={styles.shoeName}>{shoe.name}</Text>
          <Image
            style={styles.ratingIcon}
            resizeMode="cover"
            source={require("../assets/rating.png")}
          />
        </View>

        <View style={styles.shoeReferenceTwo}>
          <ImageBackground
            style={styles.priceBackground}
            resizeMode="cover"
            source={require("../assets/ellipse-3.png")}
          >
            <Text style={styles.shoePrice}>${shoe.price}</Text>
          </ImageBackground>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shoecard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 17,
    width: "95%",
    height: 212,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  shoeReference: {
    marginLeft: "5%",
  },
  shoeImage: {
    borderRadius: 25,
    width: "95%",
    height: "95%",
    marginLeft: 8,
    marginTop: -15,
  },
  shoeName: {
    fontSize: 18,
    color: "#3B3B3B",
    fontWeight: "semibold",
    marginTop: -30,
  },
  shoeReferenceTwo: {
    justifyContent: "flex-end",
    height: "100%",
  },
  shoePrice: { fontSize: 16 },
  priceBackground: {
    width: 70,
    height: 57,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShoeCard;
