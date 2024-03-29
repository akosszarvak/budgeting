import axios from "axios";

const API_URL = "/api/users";

//register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "/login", userData);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const authHelpers = { register, login };
