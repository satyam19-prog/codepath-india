import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);

const API = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;