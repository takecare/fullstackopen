import config from './config';
const endpoint = `${config.baseUrl}/api/login`;

const login = async (username, password) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };
  const response = await fetch(endpoint, options);
  if (!response.ok) {
    const body = await response.json();
    throw Error(`${response.status} ${body.error}`);
  }
  return response.json();
};

const logout = async () => {
  //
};

export default {
  login,
  logout,
};
