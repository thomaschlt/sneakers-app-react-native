import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import shoeCollectionService from "../api/shoeCollectionService";
import ShoeCollection from "../components/ShoeCollection";
import { selectCustomerId } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import GoBack from "../components/GoBack";
import Feedback from "../components/Feedback";

const ShoeCollectionScreen = ({}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Stateful value to save the customer shoe collection
  const [shoeCollection, setShoeCollection] = useState({ shoes: [] });

  // Recuperation of the current state of the store
  const customerId = useSelector(selectCustomerId);

  // Fetch shoe collection of the custumer
  const fetchCustomerCollection = async () => {
    setLoading(true);
    setError(null);
    try {
      const customerCollection = await shoeCollectionService.GetShoeCollection(
        customerId
      );
      setShoeCollection(customerCollection);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerCollection();
  }, []);

  // Deal with loading and errors
  Feedback(loading, error);

  return (
    <View style={styles.container}>
      <View style={styles.previousRow}>
        <GoBack />
      </View>
      <View style={styles.welcomeContainer}>
        <Image
          style={{ marginBottom: 27 }}
          source={require("../assets/highlight-05.png")}
        />
        <Text style={styles.textWelcome}>My shoe collection :</Text>
      </View>
      <FlatList
        data={shoeCollection.shoes}
        renderItem={({ item }) => (
          <ShoeCollection
            shoe={item}
            key={item.id.toString()}
            refresh={fetchCustomerCollection}
          />
        )}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          paddingHorizontal: 50,
          paddingVertical: 15,
          margin: 10,
          borderRadius: 10,
        }}
        onPress={() => fetchCustomerCollection()}
      >
        <Text style={{ color: "white" }}>Load Collection</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "column",
  },
  header: {
    fontSize: 24,
    fontWeight: "semibold",
    marginTop: 60,
  },
  previousRow: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 30,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20%",
    marginBottom: 40,
  },
  textWelcome: {
    marginLeft: 10,
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default ShoeCollectionScreen;
