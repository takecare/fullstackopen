import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const read = (id) => {
  const original = axios.get(`${baseUrl}/${id ? id : ""}`);
  return new Promise((resolve, reject) =>
    original.then((response) => resolve(response.data)).catch(reject)
  );
};

const create = (note) => {
  return axios.post(baseUrl, note).then((response) => response.data);
};

const update = (note) => {
  return axios.put(`${baseUrl}/${note.id}`, note);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  read,
  create,
  update,
  remove,
};
