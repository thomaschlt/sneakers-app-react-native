import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/slices/authSlice";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

const AppRoute = () => {
  // Recuperation of the current state of the store
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <NavigationContainer>
      {/* Conditional stack navigator rendering based on login state */}
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;
