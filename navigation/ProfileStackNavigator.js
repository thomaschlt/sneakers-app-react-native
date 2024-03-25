import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../theme/styles";
import ProfileScreen from "../screens/ProfileScreen";
import ModifyProfileScreen from "../screens/ModifyProfileScreen";
import ShoeCollectionScreen from "../screens/ShoeCollectionScreen";

// Screen stack for Profile tab
const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={screenOptions}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: false, //remove top bar from Profile screen
        }}
      />
      <ProfileStack.Screen
        name="ModifyProfile"
        component={ModifyProfileScreen}
        options={{
          title: "ModifyProfile",
          headerShown: false, //remove top bar from ModifyProfile screen
        }}
      />
      <ProfileStack.Screen
        name="ShoeCollection"
        component={ShoeCollectionScreen}
        options={{
          title: "ShoeCollection",
          headerShown: false, //remove top bar from Home screen
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
