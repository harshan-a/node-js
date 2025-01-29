const http = require('http');

// const server = http.createServer((req, res) => {
//   res.end("hello");
// });


// Using Event Emitter API
const server = http.createServer();
// emits request event 

// listen for request event 
server.on("request", (req, res) => {
  res.end("hello");
});

server.listen(5000);

