const util = require("util");
const _morgan = require("morgan");

_morgan.token("body", (req) => util.inspect(req.body));
const morgan = _morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    tokens.body(req),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

module.exports = morgan;
