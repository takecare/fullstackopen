import axios from "axios";
const baseUrl = "/api/persons";

const create = (person) =>
  new Promise((resolve, reject) => {
    axios
      .post(baseUrl, person)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const read = (id) => {
  const original = axios.get(`${baseUrl}/${id ? id : ""}`);
  return new Promise((resolve, reject) => {
    original
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const update = (person) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${baseUrl}/${person.id}`, {
        name: person.name,
        number: person.number,
      })
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
