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
const token = args[3];

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

if (token) {
  options.headers["authorization"] = `Bearer ${token}`;
}

// let token;

console.log(`>>> ${method} ${baseUrl}${path}`);
const request = http.request(options, (response) => {
  let buffer = Buffer.alloc(0);

  console.log("<<< STATUS: ", response.statusCode);
  console.log("<<< HEADERS: ", JSON.stringify(response.headers));
  response.on("data", (chunk) => {
    buffer = Buffer.concat([buffer, chunk], buffer.length + chunk.length);
  });
  response.on("end", () => {
    const body = buffer.toString();
    const result = body.match(/"token"\:"(.*)",/);
    if (result) {
      // token = result[0];
    }
    console.log("<<< BODY:", body);
  });
});

if (body && body.length > 0) {
  request.write(body);
}

request.end();
