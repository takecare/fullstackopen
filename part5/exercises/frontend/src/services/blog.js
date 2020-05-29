import config from "./config";
const endpoint = `${config.baseUrl}/api/blogs`;

const create = async (blog, user) => {
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(blog),
  };
  const response = await fetch(endpoint, options);
  if (!response.ok) {
    const body = await response.json();
    throw Error(`${response.status} ${body.error}`);
  }
  return response.json();
};

const update = async (blog) => {};

const read = async (id) => {
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${endpoint}/${id ? id : ""}`, options);
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
