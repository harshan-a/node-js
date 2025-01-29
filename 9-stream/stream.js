// Stream is used to send data as chunks(pieces of data, send sequencly) over time.

const
  fs = require("fs"),
  stream = fs.createReadStream("./content/big.txt", { highWaterMark: 9000 });


  
// default 64kb
// highWaterMark - control size
// const stream = fs.createReadStream("./content/big.txt", {highWaterMark: 9000});
// const stream = fs.createReadStream("./content/big.txt", {highWaterMark: 9000, encoding: "utf-8"});
// const stream = fs.createReadStream("./content/big.txt", {start: 0, end: 10});


stream.on("data", data => {
  console.log(data);
});

stream.on("error", err => console.log(err));
