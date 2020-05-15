const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return res
      .status(400)
      .send({ name: error.name, message: "Malformatted id" });
  } else if (error.name === "NotFound") {
    return res.status(404).send({ mame: error.error, message: "Not found" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ name: error.name, message: error.message });
  }

  next(error);
};

module.exports = errorHandler;
