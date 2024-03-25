import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { selectCustomerId, selectBagId } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import bagService from "../api/bagService";
import shoeCollectionService from "../api/shoeCollectionService";
import BagShoe from "../components/BagShoe";
import GoBack from "../components/GoBack";
import Feedback from "../components/Feedback";
import TitleLeft from "../components/TitleLeft";
import ActionButton from "../components/ActionButton";

const BagScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Save customer bag info
  // Initialize to no shoe
  const [bag, setBag] = useState({ shoes: [] });

  // Recuperation of the current state of the store
  const customerId = useSelector(selectCustomerId);
  const bagId = useSelector(selectBagId);

  // Collect customer bag info and save it in a stateful value
  const fetchCustomerBag = async () => {
    setLoading(true);
    setError(null);
    try {
      const customerBag = await bagService.GetBag(customerId);
      setBag(customerBag);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(error);
      setLoading(false);
    }
  };

  // Function to purchase a bag
  const buyBag = async () => {
    setLoading(true);
    setError(null);
    try {
      // Initialisation of the data to send to the API
      // Check API documentation to know the convention
      const data = {
        Id: bagId,
        CustomerId: customerId,
        Type: 0,
      };
      // Request
      // Be careful the wallet is not implemented.
      // If the shoe isn't added to your account it may be because
      // you don't have enougn money. Make sure to buy with the customer
      // specified in the report
      await shoeCollectionService.PutShoeCollection(customerId, data);
      Alert.alert("Your purchases has been added to your account");
      // We refresh the component to update its rendered
      fetchCustomerBag();
      navigation.navigate("Home");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerBag();
  }, []);

  // Deal with loading and errors
  Feedback(loading, error);

  return (
    <View style={styles.bagContainer}>
      <View style={styles.topBar}>
        <GoBack />
        <TitleLeft title="My bag" />
      </View>
      {bag.shoes.length === 0 ? (
        <View style={styles.emptyBagContainer}>
          <Text style={styles.emptyBagText}>Your bag is empty...</Text>
          <TouchableOpacity
            style={styles.buyShoesButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buyShoesText}>Check some shoes!</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/*List of shoe in customer bag*/}
          <FlatList
            data={bag.shoes}
            renderItem={({ item }) => (
              <BagShoe
                shoe={item}
                key={item.id.toString()}
                refresh={fetchCustomerBag}
              />
            )}
          />
          <View style={styles.bagTotal}>
            <Text style={styles.bagLength}>
              Total: {bag.shoes.length} items
            </Text>
            <Text style={styles.bagPrice}>{bag.price} USD </Text>
          </View>
          <ActionButton action={buyBag} title="Proceed to Checkout" />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bagContainer: {
    flex: 1,
    flexDirection: "column",
  },
  topBar: { marginTop: 50, marginLeft: 20 },
  logo: {
    width: 118,
    height: 37,
  },
  emptyBagContainer: {
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  emptyBagText: { fontWeight: "semibold", fontSize: 20, color: "#3D3D3D" },
  buyShoesButton: {
    alignItems: "center",
    marginTop: 10,
  },
  buyShoesText: {
    fontSize: 17,
    padding: 10,
    color: "#6B6B6B",
    textDecorationLine: "underline",
  },
  bagTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 15,
    marginRight: 15,
  },
  bagPrice: {
    fontWeight: "bold",
    fontSize: 16,
  },
  bagLength: { fontWeight: "bold", fontSize: 16, color: "#3D3D3D" },
});
export default BagScreen;
