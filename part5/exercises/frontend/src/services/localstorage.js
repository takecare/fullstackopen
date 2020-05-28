const read = (key) => {
  const value = window.localStorage.getItem(key);
  return JSON.parse(value);
};

const write = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const remove = (key) => {
  window.localStorage.removeItem(key);
};

export default {
  read,
  write,
  remove,
};
