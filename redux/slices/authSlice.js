import { createSlice } from "@reduxjs/toolkit";

// Initialisation of the initial state to store
const initialState = {
  isLoggedIn: false,
  // We don't store only customerId to limit request to API to add and remove shoe
  customerId: null,
  bagId: null,
  shoeCollectionId: null,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  // Set of function to update the store
  reducers: {
    setSignIn: (state, action) => {
      state.customerId = action.payload.customerId;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.bagId = action.payload.bagId;
      state.shoeCollectionId = action.payload.shoeCollectionId;
    },
    setSignOut: (state) => {
      state.customerId = null;
      state.isLoggedIn = false;
      state.bagId = null;
      state.shoeCollectionId = null;
    },
  },
});

// We export the slice to make it available to our React Native
export const { setSignIn, setSignOut } = authSlice.actions;

// Set of function to read info in the store
export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;
export const selectCustomerId = (state) => state.userAuth.customerId;
export const selectShoeCollectionId = (state) =>
  state.userAuth.shoeCollectionId;
export const selectBagId = (state) => state.userAuth.bagId;

export default authSlice.reducer;
