import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ShoeService from "../api/shoeService";
import ShoeCard from "../components/ShoeCard";
import BrandCard from "../components/BrandCard";
import Feedback from "../components/Feedback";
import GoToBag from "../components/GoToBag";
import TitleLeft from "../components/TitleLeft";

const AllShoes = ({ navigation }) => {
  // Staful value to save the brands available in the store
  const [brands, setBrands] = useState([]);
  // Default value for the filter
  const [selectedBrand, setSelectedBrand] = useState("All");

  // Shoes found with the current filter
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Collect all the shoes
  const fetchShoes = async () => {
    setLoading(true);
    setError(null);
    try {
      const shoes = await ShoeService.GetShoes();
      setShoes(shoes);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  // Fonction to render the boutons to actualize the filter
  const renderBrand = ({ item }) => (
    <BrandCard
      brand={item}
      // Define which brand as the focus
      isSelected={selectedBrand === item}
      // Change the brand to filter
      onPress={() => setSelectedBrand(item)}
    ></BrandCard>
  );

  // Get all the brands available in the shop
  const getBrands = async () => {
    const brands = await ShoeService.GetBrands();
    setBrands(["All", ...brands]); // add "All" to the beginning of the array
  };

  useEffect(() => {
    getBrands();
  }, []);

  // Deal with loading and errors
  Feedback(loading, error);

  return (
    <View style={styles.allShoesContainer}>
      <View style={styles.topBar}>
        <TitleLeft title="Our products" />
        <GoToBag />
      </View>
      <ScrollView>
        <View style={styles.brandChoice}>
          <FlatList
            data={brands}
            renderItem={renderBrand}
            keyExtractor={(item) => item}
            horizontal
          />
        </View>

        <View style={styles.allShoes}>
          {shoes
            .filter(
              (shoe) => selectedBrand === "All" || shoe.brand === selectedBrand
            )
            .map((shoe) => {
              return <ShoeCard shoe={shoe} key={shoe.id} />;
            })}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  allShoesContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 60,
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  brandChoice: {
    width: "90%",
    marginTop: 20,
    marginLeft: 20,
  },
  allShoes: {
    marginTop: 50,
    height: "100%",
  },
});

export default AllShoes;
