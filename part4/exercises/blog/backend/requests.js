const http = require("http");
const config = require("./utils/config");

const args = process.argv.slice(2);
// args[0] = method
// args[1] = path
// args[2] = body (json)

if (args.length < 1) {
  console.log("Usage: node requests.js method path [body]");
  process.exit(1);
}

const baseUrl = "/api/blogs";
const options = {
  port: config.port,
  host: "localhost",
  method: args[0],
  path: `${baseUrl}${args[1]}`,
  headers: {
    "content-type": "application/json",
  },
};

console.log(`>>> ${args[0]} ${baseUrl}${args[1]}`);
const request = http.request(options, (response) => {
  console.log("<<< STATUS: ", response.statusCode);
  console.log("<<< HEADERS: ", JSON.stringify(response.headers));
  response.on("data", (chunk) => console.log("<<< BODY:", chunk.toString()));
});

if (args[2]) {
  request.write(args[2]);
}

request.end();
