import axios from "axios";

const API_URL = "/api/ledgers";
// const accessToken = JSON.parse(localStorage?.getItem("user")).token;

// const authAxios = axios.create({
//   baseURL: API_URL,
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// });

//get user's ledgers
const getLedgers = async (user) => {
  const token = user.queryKey[1].token;
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(JSON.parse(response.data));
    return JSON.parse(response.data);
  } catch (error) {
    console.log("error here");

    return error.response;
  }
};

//get user's balance in [income: x, expense: y] format
const getBalance = async (user) => {
  const token = user.queryKey[1].token;
  try {
    const response = await axios.get(API_URL + "/balance", {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("balance: ", JSON.parse(response.data));
    return JSON.parse(response.data);
  } catch (error) {
    console.log("error here");

    return error.response;
  }
};

const addLedger = async (ledgerData, user) => {
  const token = user.token;

  try {
    const response = await axios.post(API_URL, ledgerData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(JSON.parse(response.data));
    return JSON.parse(response.data);
  } catch (error) {
    console.log("error here");
    console.log(error.response);

    return error.response;
  }
};

const updateLedger = async (ledgerData) => {
  const token = user.token;

  try {
    const response = await axios.post(API_URL, ledgerData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(JSON.parse(response.data));
    return JSON.parse(response.data);
  } catch (error) {
    console.log("error here");

    return error.response;
  }
};

//delete user's ledger
const deleteLedger = async (ledgerId, user) => {
  const token = user.token;
  try {
    const response = await axios.delete(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
      data: { id: ledgerId },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error here");
    console.log(error);
    return error.response;
  }
};

export const ledgerCalls = {
  getLedgers,
  deleteLedger,
  addLedger,
  updateLedger,
  getBalance,
};
