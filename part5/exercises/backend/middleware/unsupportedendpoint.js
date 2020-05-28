const unsupportedEndpoint = (req, res, next) => {
  res.status(404).json({ error: "Unsupported endpoint" });
};

module.exports = unsupportedEndpoint;
