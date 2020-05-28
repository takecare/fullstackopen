import axios from "axios";
import { baseUrl } from "./config";
const endpoint = `${baseUrl}/api/notes`;

const read = (id) => {
  const response = axios.get(`${endpoint}/${id ? id : ""}`);
  return new Promise((resolve, reject) =>
    response.then((response) => resolve(response.data)).catch(reject)
  );
};

const create = (note, token) => {
  const config = { headers: { authorization: `bearer ${token}` } };
  return axios.post(endpoint, note, config).then((response) => response.data);
};

const update = (note) => {
  return axios.put(`${endpoint}/${note.id}`, note);
};

const remove = (id) => {
  return axios.delete(`${endpoint}/${id}`);
};

export default {
  read,
  create,
  update,
  remove,
};
