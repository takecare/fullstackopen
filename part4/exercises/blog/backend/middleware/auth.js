const authorization = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    throw {
      name: "Unauthorized",
      message: "Missing authorization header.",
    };
  }

  const token = header.substring("Bearer ".length);
  req.token = token;

  next();
};

module.exports = authorization;
