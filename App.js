import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import AppRoute from "./navigation/Navigator";
import { store } from "./redux/store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="auto" />
        <AppRoute />
      </Provider>
    </>
  );
}
