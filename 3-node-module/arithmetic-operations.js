console.log("file - arithmetic-operation.js was executed");

function add(num1, num2) {
  console.log(vari = 11);
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if(num2 == 0) {
    throw "Can't divide with zero";
  }

  return num1 / num2;
}

let vari = 10;

module.exports = {
  add, sub, multiply, divide, vari
}