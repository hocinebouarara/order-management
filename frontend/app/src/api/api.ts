import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    console.log("API is working:", response.data);
    return response.data; // ✅ Return the API response
  } catch (error) {
    console.error("API Error:", error);
    return { status: "Error" }; // ✅ Return an error object to avoid undefined
  }
};
