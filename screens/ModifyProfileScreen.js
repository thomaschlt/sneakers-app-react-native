import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import customerService from "../api/customerService";
import GoBack from "../components/GoBack";
import { selectCustomerId } from "../redux/slices/authSlice";
import Feedback from "../components/Feedback";
import Input from "../components/Input";

const ModifyProfileScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Stateful values to save customer informations
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [userName, selectUserName] = useState({});
  const [firstName, setFirstName] = useState({});
  const [lastName, setLastName] = useState({});

  const [customer, setCustomer] = useState("");

  // Recuperation of the current state of the store
  const customerId = useSelector(selectCustomerId);

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

  // Get all the information of the loged in customer to put default
  // values in the form
  const fetchCustomer = async () => {
    setLoading(true);
    setError(null);
    try {
      const customer = await customerService.GetCustomer(customerId);
      setCustomer(customer);
      setEmail(customer.email);
      setPassword(customer.password);
      selectUserName(customer.username);
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(error);
      setLoading(false);
    }
  };

  // Handle modification of personnal information
  const modify = async () => {
    setLoading(true);
    setError(null);
    try {
      // Initialisation of the data to send to the API
      // Check API documentation to know the convention
      const customer = {
        Id: customerId,
        Username: userName,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
      };
      // Modification of the current account
      await customerService.PutCustomer(customerId, customer);
      Alert.alert("Modifications have been applied");
      fetchCustomer();
      navigation.navigate("Profile");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
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
        <Text style={styles.textWelcome}>Change data :)</Text>
      </View>

      <Input
        source={""}
        placeholder={customer.username}
        onChangeText={usernameSet}
        value={userName}
      />
      <Input
        source={""}
        placeholder={customer.firstName}
        onChangeText={firstNameSet}
        value={firstName}
      />
      <Input
        source={""}
        placeholder={customer.lastName}
        onChangeText={lastNameSet}
        value={lastName}
      />
      <Input
        source={""}
        placeholder={customer.email}
        onChangeText={mailSet}
        value={email}
      />
      <Input
        source={""}
        placeholder={customer.password}
        onChangeText={passwordSet}
        secureTextEntry={true}
        value={password}
      />
      <TouchableOpacity onPress={() => modify()} style={styles.btn}>
        <Text style={styles.text}>Modify</Text>
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
    fontSize: 36,
  },
});

export default ModifyProfileScreen;
