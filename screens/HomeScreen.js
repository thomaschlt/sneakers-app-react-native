import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import shoeService from "../api/shoeService";
import ShoeCard from "../components/ShoeCard";
import Feedback from "../components/Feedback";
import GoToBag from "../components/GoToBag";
import TitleLeft from "../components/TitleLeft";

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save shoes available
  const [shoes, setShoes] = useState([]);

  const renderItem = ({ item }) => (
    <ShoeCard key={item.id} shoe={item}></ShoeCard>
  );

  // Collect all the shoes
  const fetchShoes = async () => {
    setLoading(true);
    setError(null);
    try {
      const shoes = await shoeService.GetShoes();
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

  // Deal with loading and errors
  Feedback(loading, error);

  return (
    <View style={styles.homePage}>
      <View style={styles.logo}>
        <TitleLeft title="Sneak-er" />
        <View style={{ marginRight: 20, marginTop: 6 }}>
          <GoToBag />
        </View>
      </View>
      {/* Penser à rajouter l'onglet du panier en haut à droite */}
      {/* Barre de recherche pour les chaussures : positionnement haut central */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.promotionContainer}>
          <View style={styles.promotionContent}>
            <Text style={styles.promotionText}>Nike Air Max 15% OFF</Text>
            <Image
              style={(styles.nikeZoomMocThe10th1Icon, styles.iconLayout)}
              resizeMode="cover"
              source={require("../assets/nikezoommocthe10th-1.png")}
            />
          </View>
        </View>
        <Text style={styles.popularShoes}>Popular Shoes</Text>
        {shoes.slice(0, 3).map((shoe) => {
          return renderItem({ item: shoe });
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    marginTop: 60,
    alignItems: "center",
  },
  logo: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  nikeZoomMocThe10th1Icon: {
    width: 80,
    height: 80,
    marginRight: 1,
  },
  promotionContainer: {
    height: 151,
    width: 380,
    borderRadius: 20,
    backgroundColor: "#DAE2F8",
  },
  scrollView: {
    flex: 1,
    width: "90%",
  },
  popularShoes: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    lineHeight: 37,
    letterSpacing: -0.3,
  },
  promotionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  promotionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  sneakEr: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
});

export default HomeScreen;
