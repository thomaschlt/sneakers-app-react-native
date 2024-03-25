import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../theme/styles";
import HomeScreen from "../screens/HomeScreen";
import BagScreen from "../screens/BagScreen";
import DetailsScreen from "../screens/DetailsScreen";

// Screen stack for home tab
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false, //remove top bar from Home screen
        }}
      />
      <HomeStack.Screen
        name="Bag"
        component={BagScreen}
        options={{
          headerShown: false, //remove top bar from Bag screen
        }}
      />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerShown: false, //remove top bar from Details screen
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
