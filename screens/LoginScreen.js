import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { setSignIn } from "../redux/slices/authSlice";
import Input from "../components/Input";
import customerService from "../api/customerService";
import shoeCollectionService from "../api/shoeCollectionService";
import bagService from "../api/bagService";
import Feedback from "../components/Feedback";

const LoginScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Staful values to save form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // List of customers already signed in
  const [customers, setCustomers] = useState("");

  const dispatch = useDispatch();

  const passwordSet = (password) => {
    setPassword(password);
  };
  const emailSet = (email) => {
    setEmail(email);
  };

  // Collect all the custumers from DB
  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fecth customers
      const customers = await customerService.GetCustomers();
      setCustomers(customers);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(error);
      setLoading(false);
    }
  };

  // Collect customer info and modify the state of the store
  const fetchCustomerInfo = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      // Fecth customer bag
      const customerBag = await bagService.GetBag(customerId);
      // Fecth customer shoe collection
      const customerShoeCollection =
        await shoeCollectionService.GetShoeCollection(customerId);

      // Initialisation of the data to send to the store
      // Check slices documentation to know the convention
      const user = {
        isLoggedIn: true,
        customerId: customerId,
        bagId: customerBag.id,
        shoeCollectionId: customerShoeCollection.id,
      };
      // Update the store
      dispatch(setSignIn(user));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(error);
      setLoading(false);
    }
  };

  // Check if email and password are correct
  const handleLogin = () => {
    setLoading(true);
    setError(null);
    try {
      // Search for the first customer matching login and password
      const customer =
        customers.find((u) => u.email === email && u.password === password) ||
        null;

      if (customer != null) {
        // fetch info of the customer matching the right email and password
        fetchCustomerInfo(customer.id);
      } else {
        Alert.alert("Wrong Password or email");
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Deal with loading and errors
  Feedback(loading, error);

  return (
    <View style={styles.container}>
      <View style={styles.textWelcomeView}>
        <View style={styles.welcomeLogo}>
          <Image
            style={{ marginBottom: 30 }}
            source={require("../assets/highlight-05.png")}
          />
          <Text style={styles.textWelcome1}>Welcome back!</Text>
        </View>
        <Text style={styles.textWelcome2}>Enter your Username & Password</Text>
      </View>

      <Input placeholder="Email" onChangeText={emailSet} />
      <Input
        placeholder="Mot de passe"
        onChangeText={passwordSet}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text>Don't have an account yet ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.newAccountText}>Create a new Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "column",
  },
  welcomeLogo: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWelcomeView: {
    alignItems: "center",
    marginTop: "-30%",
  },
  textWelcome1: {
    fontSize: 32,
    marginLeft: 10,
    fontWeight: "bold",
  },
  textWelcome2: {
    color: "#565656",
    fontSize: 18,
    fontWeight: "semibold",
    marginBottom: 80,
  },
  registerContainer: {
    marginVertical: 30,
    alignItems: "center",
  },
  btn: {
    marginTop: 40,
    backgroundColor: "#000000",
    alignItems: "center",
    width: "50%",
    borderRadius: 30,
    paddingVertical: 5,
  },
  newAccountText: {
    color: "#6B6B6B",
    textDecorationLine: "underline",
  },
  text: {
    color: "white",
    fontSize: 36,
  },
});
