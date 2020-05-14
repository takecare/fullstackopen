const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return res.status(400).send({ ...error, message: "Malformatted id" });
  } else if (error.name === "NotFound") {
    return res.status(404).send({ ...error, message: "Not found" });
  } else if (error.name === "AlreadyExists") {
    return res.status(400).send(error);
  }
  // else {
  //   return res
  //     .status(500)
  //     .send({ error: "UnknownError", message: "Unknown error", ...error });
  // }

  next(error);
};

module.exports = errorHandler;
