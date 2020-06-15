import config from './config';
const endpoint = `${config.baseUrl}/api/blogs`;

const create = async (blog, user) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
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

const update = async (blog, user) => {
  const options = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(blog),
  };
  const response = await fetch(`${endpoint}/${blog.id}`, options);
  if (!response.ok) {
    const body = await response.json();
    throw Error(`${response.status} ${body.error}`);
  }
  return response.json();
};

const read = async (id) => {
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`${endpoint}/${id ? id : ''}`, options);
  if (!response.ok) {
    const body = await response.json();
    throw Error(`${response.status} ${body.error}`);
  }
  return response.json();
};

const remove = async (id, user) => {
  const options = {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await fetch(`${endpoint}/${id}`, options);
  if (!response.ok) {
    const body = await response.json();
    throw Error(`${response.status} ${body.error}`);
  }
};

export default {
  create,
  update,
  read,
  remove,
};
