import axios from "axios";

const BASE_URL = "https://uniqlo-api-nkc.herokuapp.com/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const token = localStorage.getItem("token");

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: `Bearer ${token}`,
  },
});
