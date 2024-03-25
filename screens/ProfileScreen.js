import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setSignOut, selectCustomerId } from "../redux/slices/authSlice";
import shoeCollectionService from "../api/shoeCollectionService";
import customerService from "../api/customerService";
import FeatherIcon from "react-native-vector-icons/Feather";
import Feedback from "../components/Feedback";

const ProfileScreen = ({ navigation }) => {
  const SECTIONS = [
    {
      header: "Preferences",
      items: [
        {
          id: "modify",
          icon: "settings",
          label: "Modify profile",
          type: "select",
        },
        {
          id: "ShoeCollection",
          icon: "shopping-cart",
          label: "My shoe collection",
          type: "select",
        },
      ],
    },
    {
      header: "User Activity",
      items: [
        { id: "signout", icon: "log-out", label: "Sign out", type: "select" },
        {
          id: "delete",
          icon: "user-x",
          label: "Delete account",
          type: "select",
        },
      ],
    },
  ];
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Stateful values to save username and shoe collection
  const [shoeCollection, setShoeCollection] = useState([]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");

  const dispatch = useDispatch();
  // Recuperation of the current state of the store
  const customerId = useSelector(selectCustomerId);

  // Fetch the customer
  const fetchCustomer = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const customer = await customerService.GetCustomer(customerId);
      setUsername(customer.username);
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setMail(customer.email);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer(customerId);
  }, []);

  // Deal with loading and errors
  Feedback(loading, error);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{firstName[0] + lastName[0]}</Text>
        </View>
        <Text style={styles.infoText}>{mail}</Text>
      </View>

      {SECTIONS.map(({ header, items }) => (
        <View style={styles.section} key={header}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{header}</Text>
          </View>
          <View style={styles.sectionBody}>
            {items.map(({ id, label, icon, type, value }, index) => {
              return (
                <View
                  key={id}
                  style={[
                    styles.rowWrapper,
                    index === 0 && { borderTopWidth: 0 },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      switch (id) {
                        case "signout":
                          dispatch(setSignOut());
                          break;
                        case "modify":
                          navigation.navigate("ModifyProfile");
                          break;
                        case "ShoeCollection":
                          navigation.navigate("ShoeCollection");
                          break;
                        case "delete":
                          Alert.alert(
                            "Delete Account",
                            "Are you sure you want to delete your account?",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel",
                              },
                              {
                                text: "OK",
                                onPress: () => {
                                  customerService.DeleteCustomer(customerId);
                                  dispatch(setSignOut());
                                },
                              },
                            ]
                          );
                          break;
                      }
                    }}
                  >
                    <View style={styles.row}>
                      <FeatherIcon
                        color="#616161"
                        name={icon}
                        style={styles.rowIcon}
                        size={22}
                      />

                      <Text style={styles.rowLabel}>{label}</Text>

                      <View style={styles.rowSpacer} />

                      {(type === "select" || type === "link") && (
                        <FeatherIcon
                          color="#ababab"
                          name="chevron-right"
                          size={22}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "semibold",
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "#ECF0F3",
  },
  body: {
    marginTop: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  avatar: {
    fontSize: 72,
    fontWeight: "700",
  },
  name: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "600",
    color: "#090909",
  },
  infoText: {
    fontSize: 16,
    marginTop: 6,
    fontWeight: "400",
    color: "#848484",
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

export default ProfileScreen;
