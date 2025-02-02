// const http = require("http"),
// {readFile} = require("fs").promises;

// http.createServer(async (req, res) => {
//   const url = req.url;
//   if(url === "/") {
//     const indexHTML = await readFile("./index.html");
//     res.writeHead(200, {'content-type': "text/html"});
//     res.write(indexHTML);
//     res.end();

//   } else if (url === "/about") {
//     const aboutHTML = await readFile('./about.html');
//     res.writeHead(200, {'content-type': "text/html"});
//     res.write(aboutHTML);
//     res.end();
//   }
// }).listen(8000);


const arr1 = [1, 3];
const arr2 = [...arr1];

console.log(arr2);