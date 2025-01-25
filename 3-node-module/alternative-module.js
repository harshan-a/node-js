/*
module.exports.greed1 = function() {
  console.log('Hello, World!!!');
}
// the above is slighty similar as :
// export function greed1() {
//   console.log("Hello, World!!!");
// }


module.exports.var1 = 'Hello, World!!!';

// this will gives an object with two property(greed, var1) while we  require using this file path 
*/


/*
function greed2() {
  console.log("Hello, World!!!");
}

const var2 = "Hello, World!!!";

module.exports = {
  greed2, // greed: greed,
  var2 // var1: var1
}
*/

export const add = (num1, num2) => num1 + num2;
export const sub = (num1, num2) => num1 - num2;
console.log("file1");