const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  // const text = fs.readFileSync("./content/big.txt");
  // res.end(text);

  const stream = fs.createReadStream("./content/big.txt");
  stream.on('open', function(result) {
    stream.pipe(res);
  })
  stream.on("error", function() {
    res.end(err);
  })
}).listen(5000);