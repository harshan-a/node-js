console.log("Hello, World! node js");

console.log("second sync line");

setTimeout(() => {
  console.log("first async line");
}, 2000);

console.log("last sync line");