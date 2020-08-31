import axios from "axios";
import { baseUrl } from "./config";
const endpoint = `${baseUrl}/api/users`;

const signup = async (name, username, password) => {
  const response = await axios.post(endpoint, { name, username, password });
  return response.data;
};

export default {
  signup,
};
