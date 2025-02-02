const http = require("node:http");
const fs = require("node:fs");

const indexHTML = fs.readFileSync("./index.html", "utf-8"),
genCss = fs.readFileSync("./style/general.css"),
h1Css = fs.readFileSync("./style/header1.css"),
h2Css = fs.readFileSync("./style/header2.css"),
faCss = fs.readFileSync("./style/font-awesome.css"),
x = fs.readFileSync("./scripts/index.js"),
p = fs.readFileSync("./image/photo.jpeg"),
aboutHTML = fs.readFileSync("./about.html"),
contactHTML = fs.readFileSync("./contact.html"),
projectHTML = fs.readFileSync("./project.html");
errorHTML = fs.readFileSync("./error.html");

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url)
  if(url === "/") {
    res.writeHead(200, {'content-type': "text/html"});
    res.write(indexHTML);
    res.end();

  } else if (url === "/style/general.css") {
    // response(res, 304, "text/css", genCss);
    res.writeHead(200, {'content-type': "text/css"});
    res.write(genCss);
    res.end();

  } else if (url === "/style/header1.css") {
    // response(res, 304, "text/css", h1Css);
    res.writeHead(200, {'content-type': "text/css"});
    res.write(h1Css);
    res.end();

  } else if (url === "/style/header2.css") {
    response(res, 200, "text/css", h2Css);

  } else if (url === "/style/font-awesome.css") {
    response(res, 200, "text/css", faCss);
  
  } else if (url === "/scripts/index.js") {
    response(res, 200, "text/javascript", x);
  
  } else if (url === "/image/photo.jpeg") {
    response(res, 200, "image/jpeg", p);
  
  } else if (url === "/about.html") {
    console.log("helo")
    response(res, 200, "text/html", aboutHTML);
  
  } else if (url === "/contact.html") {
    response(res, 200, "text/html", contactHTML);
  
  } else if (url === "/project.html") {
    response(res, 200, "text/html", projectHTML);
    
  } else {
    response(res, 404, "text/html", errorHTML);
  }

}).listen(5000);

function response(res, sc, ct, file) {
  res.writeHead(sc, {'content-type': ct});
  res.write(file);
  res.end();
}