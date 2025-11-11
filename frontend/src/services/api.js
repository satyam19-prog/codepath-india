import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.VITE_API_URL}/api`,
  withCredentials: true,
});

export default API;