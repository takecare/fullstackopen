const http = require("http");
const config = require("./utils/config");

const args = process.argv.slice(2);

if (args.length < 1) {
  console.log("Usage: node requests.js method path [body]");
  console.log(
    'e.g.: node requests.js POST / "{ "author": "name", "title": "title", "url": "url" }"'
  );
  process.exit(1);
}

const method = args[0];
const path = args[1];
const body = args[2];

const baseUrl = "";
const options = {
  port: config.port,
  host: "localhost",
  method: method,
  path: `${baseUrl}${path}`,
  headers: {
    "content-type": "application/json",
  },
};

console.log(`>>> ${method} ${baseUrl}${path}`);
const request = http.request(options, (response) => {
  console.log("<<< STATUS: ", response.statusCode);
  console.log("<<< HEADERS: ", JSON.stringify(response.headers));
  response.on("data", (chunk) => console.log("<<< BODY:", chunk.toString()));
});

if (body) {
  request.write(body);
}

request.end();
