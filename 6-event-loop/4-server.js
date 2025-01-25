const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("Home Page");
    console.log("request event");
    res.end();

  } else if (req.url === "/orders") {
    res.write("Orders Page");
    res.end();
  };
});

server.listen("5000", () => {
  console.log("Server listening on port: 5000....")
});