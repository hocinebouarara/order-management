import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/", // adjust to your backend
  withCredentials: true,
});

export default api;
