import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProductsStackNavigator from "./ProductsStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

const Tab = createBottomTabNavigator();

// Visuel of the app when the customer is logged
const AppNavigator = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f4511e" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Icons will be different if the tab is focused
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "products") {
              iconName = focused ? "pricetags" : "pricetags-outline";
            }
            // You can return any component that you like here
            return (
              <Ionicons
                style={styles.tabIcon}
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          // Behavior of the navbar
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
          // Hiding tab navigator header to show only stack header
          headerShown: false,
          tabBarLabel: () => null,
        })}
      >
        <Tab.Screen name="home" component={HomeStackNavigator} />
        <Tab.Screen name="products" component={ProductsStackNavigator} />
        <Tab.Screen name="profile" component={ProfileStackNavigator} />
      </Tab.Navigator>
    </>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabIcon: { marginTop: 20 },
});
