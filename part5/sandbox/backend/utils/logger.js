const info = (...params) =>
  process.env.NODE_ENV === 'production' ? () => {} : console.log(...params);

const error = (...params) =>
  process.env.NODE_ENV === 'production' ? () => {} : console.error(...params);

module.exports = { info, error };
