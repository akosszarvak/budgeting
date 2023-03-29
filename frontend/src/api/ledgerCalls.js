import axios from "axios";

const API_URL = "/api/ledgers";
const accessToken = JSON.parse(localStorage.getItem("user")).token;

console.log(accessToken);

const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

//get user's ledgers
const getLedgers = async () => {
  try {
    const response = await authAxios.get();
    console.log(JSON.parse(response.data));
    return JSON.parse(response.data);
  } catch (error) {
    console.log("error here");
    return error.response;
  }
};

export const ledgerCalls = { getLedgers };
