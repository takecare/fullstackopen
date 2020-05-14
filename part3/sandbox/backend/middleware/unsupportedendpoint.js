const unsupportedEndpoint = (req, res) => {
  res.status(404).send({ error: "Unsupported endpoint." });
};

module.exports = unsupportedEndpoint;
