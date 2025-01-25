
/*
const ariOp = require("./arithmetic-operations.js");

console.log("index.js was executed");

console.log(ariOp.add(1, 3));
console.log(ariOp.multiply(1, 3));
console.log(ariOp.sub(1, 3));

try {
  // const divide = ariOp.divide(1, 0);
  // console.log(divide);
  console.log(ariOp.divide(1, 0));

} catch(err) {
  console.log("error:", err);
}
console.log(ariOp.divide(20, 20));
*/


// const altMod = require("./alternative-module");

// console.log(altMod);

// const foo = require("./arithmetic-operations");

// foo.add(10, 19);
// console.log(foo.vari);

import {add, sub} from "./alternative-module.js";
console.log("file2");
console.log(add(1, 56));
console.log(sub(1, 56));
