import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { setSignIn } from "../redux/slices/authSlice";
import Input from "../components/Input";
import customerService from "../api/customerService";
import shoeCollectionService from "../api/shoeCollectionService";
import bagService from "../api/bagService";
import GoBack from "../components/GoBack";
import Feedback from "../components/Feedback";

const RegisterScreen = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Stateful values to save customer informations
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, selectUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [customers, setCustomers] = useState("");

  const passwordSet = (password) => {
    setPassword(password);
  };
  const mailSet = (email) => {
    setEmail(email);
  };
  const usernameSet = (userName) => {
    selectUserName(userName);
  };
  const firstNameSet = (firstName) => {
    setFirstName(firstName);
  };
  const lastNameSet = (lastName) => {
    setLastName(lastName);
  };

  const dispatch = useDispatch();

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

  // Handle creation of a new customer
  const register = async () => {
    setLoading(true);
    setError(null);
    try {
      // Check if email adresse isn't already used in DB
      const tryRegister = customers.find((u) => u.email === email) || null;

      // Check if all input respect the requirements of the API
      const verif =
        userName.length >= 3 &&
        firstName.length >= 3 &&
        lastName.length >= 3 &&
        email.length >= 3 &&
        password.length >= 3;

      // Problem of filling
      if (verif === false) {
        Alert.alert("All inputs must be filled out.");
      }
      // Creation of a new account
      else if (tryRegister === null) {
        // Initialisation of the data to send to the API
        // Check API documentation to know the convention
        const customer = {
          Username: userName,
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Password: password,
        };

        // Creation of new account
        const newCustomer = await customerService.PostCustomer(customer);

        // Login
        fetchCustomerInfo(newCustomer.id);
      } else {
        Alert.alert("Email already in use");
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
      <View style={styles.previousRow}>
        <GoBack />
      </View>
      <View style={styles.welcomeContainer}>
        <Image
          style={{ marginBottom: 27 }}
          source={require("../assets/highlight-05.png")}
        />
        <Text style={styles.textWelcome}>Create Account :)</Text>
      </View>

      <Input placeholder="Username" onChangeText={usernameSet} />
      <Input placeholder="First Name" onChangeText={firstNameSet} />
      <Input placeholder="Last Name" onChangeText={lastNameSet} />
      <Input placeholder="Email" onChangeText={mailSet} />
      <Input
        placeholder="Password"
        onChangeText={passwordSet}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={() => register()} style={styles.btn}>
        <Text style={styles.text}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "column",
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
    marginTop: "-15%",
    marginBottom: 40,
  },
  textWelcome: {
    marginLeft: 10,
    fontSize: 32,
    fontWeight: "bold",
  },
  btn: {
    marginTop: 40,
    backgroundColor: "#000000",
    alignItems: "center",
    width: "50%",
    borderRadius: 30,
    paddingVertical: 5,
  },
  text: {
    color: "white",
    fontSize: "36",
  },
});
