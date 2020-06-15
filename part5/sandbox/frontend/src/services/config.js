const baseUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_BASE_URL_DEV
    : process.env.REACT_APP_API_BASE_URL_PROD; // TODO add test env

export { baseUrl };
