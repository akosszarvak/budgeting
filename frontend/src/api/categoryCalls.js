import axios from "axios";

const API_URL = "/api/categories";
// const accessToken = JSON.parse(localStorage?.getItem("user")).token;

// const authAxios = axios.create({
//   baseURL: API_URL,
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// });

//get user's ledgers
const getCategories = async (user) => {
  const token = user.queryKey[1].token;
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(JSON.parse(response.data));
    return JSON.parse(response.data);
  } catch (error) {
    console.log("error here");

    return error.response;
  }
};

export const categoryCalls = { getCategories };
