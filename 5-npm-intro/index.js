// --> npm - global command, comes with node 
// --> npm --version or npm --v

// local dependencies - use it only in this particular project 
// command to install local dependency - npm i <package name>

// global dependencies - use it in any project
// command to install global dependency - npm install -g <package name>

// package.json - it is a manifest file (i.e stores important info about project)
// to create package.json there are three ways:
// --> manual approach (create package.json in the root, and create the properties etc)
// --> command: npm init 
// --> command: npm init -y (for default properties)

// create dev dependencies -- npm install <name> -D (or) npm install <name> --save-dev
console.log("start");
console.log("Hello, World!");



const lodash = require("lodash");
// console.log(lodash);

const arr = [1, [2, [3, [4]]]];
const newArr = lodash.flattenDeep(arr);
console.log(newArr);




/*
function flattenDeepOwn(arr) {
  if(arr.length === 0) return;

  const newArr = [];
  function flatten(arr) {
    arr.forEach((item) => {
      if(Array.isArray(item)) {
        flatten(item);
        return;
      }
      newArr.push(item);
    });
  }
  flatten(arr);
  return newArr;
}

console.log(flattenDeepOwn(arr));
*/