// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

const cors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return res.status(200).send();
  }
  next();
};

module.exports = cors;
