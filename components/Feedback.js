import React from "react";
import LoadingSpinner from "./LoadingSpinner";

// Component to give feedback to the user when an error occur or when
// a request to the API isn't finished
const Feedback = ({ loading, error }) => {
  // Deal with loading and errors
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <Text>An error occurred: {error.message}</Text>;
  }
};

export default Feedback;
