import { toast } from "react-toastify";
import axios from "axios";

// Set up Axios instance with baseURL from environment variables
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const register = async (user) => {
  const URL = `/api/users`;
  try {
    const res = await API.post(URL, user); // Use API instance
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message };
  }
};

export const login = async (user) => {
  const URL = `/api/users/login`;
  try {
    const res = await API.post(URL, user); // Use API instance
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message };
  }
};

export const authService = { register, login };