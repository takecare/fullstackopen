import config from "./config";
const endpoint = `${config.baseUrl}/api/blogs`;

const create = async (blog) => {};

const update = async (blog) => {};

const read = async (id) => {
  const response = await fetch(`${endpoint}/${id ? id : ""}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const body = await response.json();
    throw Error(`${response.status} ${body.error}`);
  }
  return response.json();
};

const remove = async (id) => {};

export default {
  create,
  update,
  read,
  remove,
};
