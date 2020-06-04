const unsupportedEndpoint = (_req, res) => {
  res.status(404).json({ error: "Unsupported endpoint" });
};

module.exports = unsupportedEndpoint;
