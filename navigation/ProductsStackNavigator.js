import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../theme/styles";
import AllShoesScreen from "../screens/AllShoesScreen";

// Screen stack for Products tab
const ProductsStack = createNativeStackNavigator();

const ProductsStackNavigator = () => {
  return (
    <ProductsStack.Navigator
      initialRouteName="Products"
      screenOptions={screenOptions}
    >
      <ProductsStack.Screen
        name="Products"
        component={AllShoesScreen}
        options={{
          headerShown: false, //remove top bar from AllShoes screen
        }}
      />
    </ProductsStack.Navigator>
  );
};

export default ProductsStackNavigator;
