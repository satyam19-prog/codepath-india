import axios from "axios";
const API_URL = process.env.VITE_API_URL
const API = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export default API;