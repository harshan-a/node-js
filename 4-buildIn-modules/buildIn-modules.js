/*
Some buildin modules: 
OS 
PATH 
FS - file system
HTTP
*/



/*
const os = require("os");

// info about current user
console.log(os.userInfo());

// method to return system uptime in seconds
console.log("System uptime is " + os.uptime() + " seconds");

// some method in os module
const currentOS = {
  name: os.type(), 
  release: os.release(), 
  totalMem: os.totalmem(),
  freeMem: os.freemem()
};
console.log(currentOS);
*/



/*
const path = require("path");

console.log(path.sep);

const filePath = path.join("content", "subfolder", "text.txt");
console.log(filePath);

const base = path.basename(filePath);
console.log(base);

const dir = path.dirname(filePath);
console.log(dir);

const absolute = path.resolve("content", "subfolder", "text.txt");
console.log(absolute);
*/



/*
const fs = require("fs");

// using the synchronous code.
const {
  readFileSync, 
  writeFileSync
} = fs;

const first = readFileSync("./content/first.txt", "utf-8");
console.log(first);
const second = readFileSync("./content/second.txt", "utf-8");
console.log(second);

writeFileSync(
  "./content/result-sync.txt",
  `Hello everyone this is file, which is created by writeFileSync function. The content of this file is: ${first}, ${second}`
);

writeFileSync(
  "./content/result-sync-1.txt",
  `Hello everyone this is file, which is created by writeFileSync function with append. The content of this file is: ${first}, ${second}`,
  {flag: 'a'}
);


// using the asynchronous code.
const {readFile, writeFile} = require("fs");

readFile("./content/first.txt", "utf-8", (error, firstRes) => {
  if(error) {
    console.log(error);
    return;
  };
  const firstMsg = firstRes;
  readFile("./content/second.txt", "utf-8", (error, secondRes) => {
    if(error) {
      console.log(error);
      return;
    }
    const secondMsg = secondRes;
    writeFile(
      "./content/result-async.txt", 
      `"Hello, World!!! This is the file created by writeFile function. Content: ${firstMsg}, ${secondMsg}"`, 
      (err, res) => {
      if(err) {
        console.log(err);
        return;
      }
      console.log(res);
      } 
    )
  })
})
*/



/*
const http = require("http");

// const server = http.createServer((req, res) => {
//   res.write("Helo, everyone");
//   res.end();
// });

// server.listen(5000);

const server = http.createServer((req, res) => {
  if(req.url === "/") {
    res.write("Helo, everyone. This is the home page.");
    res.end();

  } else if(req.url === "/urlPath2") {
    res.write("Helo, everyone. This is page 2");
    res.end();

  } else {
    res.write(`
      <h1>Oops! File Path does not exits.</h1>
      <p>Press below botton for home page</p>
      <a href="/"><button>Click</button></a>
    `)
    res.end();
  }

});

server.listen(5000);
*/
