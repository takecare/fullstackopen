import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const read = (id) => {
  const original = axios.get(`${baseUrl}/${id ? id : ""}`);
  return new Promise((resolve, reject) => {
    original
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const create = (number) =>
  new Promise((resolve, reject) => {
    axios
      .post(baseUrl, number)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const update = (number) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${baseUrl}/${number.id}`, number)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const remove = (id) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${baseUrl}/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

export default {
  create,
  read,
  update,
  remove,
};
