import fs from "fs";
// const fs = require("fs");

const { readFile, writeFile } = fs;

/*
new Promise((resolve, reject) => {
  readFile(
    "../4-buildIn-modules/content/first.txt", "utf-8", 
    (err, res1) => {
    if (err) reject(err);
    resolve({ res1 });
  });

}).then((res) => {
  return new Promise((resolve, reject) => {
    readFile(
      "../4-buildIn-modules/content/second.txt", "utf-8", 
      (err, res2) => {
      if (err) reject(err);

      res.res2 = res2;
      resolve(res);
    })
  })

}).then((res) => {
  return new Promise((resolve, reject) => {
    writeFile(
      "../4-buildIn-modules/content/result-async.txt", 
      `"This is Awesome: ${res.res1}, ${res.res2}"`, 
      (err, res3) => {
      if(err) reject(err);

      res.res3 = "Written Successfully";
      resolve(res);
    })
  })

}).then((res) => {
  console.log(res);

}).catch((err) => {
  console.log(err);
});
*/

/*
Promise.all([
  new Promise((resolve, reject) => {
    readFile(
    "../4-buildIn-modules/content/first.txt", "utf-8", 
    (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  }),
  new Promise((resolve, reject) => {
    readFile(
    "../4-buildIn-modules/content/second.txt", "utf-8", 
    (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  })

]).then((totalRes) => {
  return new Promise((resolve, reject) => {
    writeFile(
    "../4-buildIn-modules/content/result-async.txt", 
    `"This is Awesome: ${totalRes[0]}, ${totalRes[1]}"`, 
    (err, res) => {
      if(err) reject(err);
      totalRes.push("Written Successfully.");
      resolve(totalRes);
    })
  })

}).then((res) => {
  console.log(res);

}).catch((err) => {
  console.log(err);
});
*/


export const readText = (path) => {
  const promise = new Promise((resolve, reject) => {
    readFile(path, 'utf-8',
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      })
  });
  return promise;
};

export const writeText = (path, data) => {
  return new Promise((resolve, reject) => {
    writeFile(path,
      `This is Awesome: ${data}`,
      (err, res) => {
        if (err) return reject(err);
        console.log("Written Successfully");
        resolve();
      }
    );
  })
}


/*
const arr = [];
readText(
  '../4-buildIn-modules/content/first.txt'

).then((res) => {
  arr.push(res);
  return readText('../4-buildIn-modules/content/second.txt');

}).then((res) => {
  arr.push(res);
  writeText("../4-buildIn-modules/content/result-async.txt", arr);

}).catch((err) => {
  // console.log(arr);
  console.log(err);
});
*/

function start() {
  Promise.all([
    readText('../4-buildIn-modules/content/first.txt'),
    readText('../4-buildIn-modules/content/second.txt')
  
  ]).then((res) => {
    writeText("../4-buildIn-modules/content/result-async.txt", res);
  
  }).catch((err) => {
    console.log(err);
  })
}
// start();

// module.exports = {
//   readText, writeText
// }