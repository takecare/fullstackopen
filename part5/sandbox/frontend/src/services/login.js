import axios from "axios";
import { baseUrl } from "./config";
const endpoint = `${baseUrl}/api/login`;

const login = async (username, password) => {
  const response = await axios.post(`${endpoint}`, { username, password });
  return response.data;
};

export default {
  login,
};
