import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { authHelpers } from "../api/axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const response = await authHelpers.register(userData);
    console.log("response in usesignup hook: ", response);

    if (response.status === 201) {
      //save user to localstorage
      localStorage.setItem("user", JSON.stringify(response.data));
      //update auth context
      dispatch({ type: "LOGIN", payload: response.data });

      setSuccess("Registration successful");
      setIsLoading(false);
    } else if (response.status === 400) {
      setError(response.data.message);
      setIsLoading(false);
    } else if (response.status === 500) {
      setError("Internal Server Error");
      setIsLoading(false);
    } else {
      setError("An Error Occured");
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, success };
};
