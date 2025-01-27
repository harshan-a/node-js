import { readFile, writeFile } from "fs";
import util from "util";

const
  readFilePromise = util.promisify(readFile),
  writeFilePromise = util.promisify(writeFile);


/*
const arr = [];
readFilePromise("../4-buildIn-modules/content/first.txt", "utf-8")
  .then((res) => {
    arr.push(res);
    return readFilePromise(
      "../4-buildIn-modules/content/second.txt", "utf-8"
    )

  }).then((res) => {
    arr.push(res);
    return writeFilePromise(
      "../4-buildIn-modules/content/result-async.txt",
      `This is Awesome: ${arr}`
    )

  }).catch((err) => {
    console.log(err);
  });
*/

/*
Promise.all([
  readFilePromise("../4-buildIn-modules/content/first.txt", "utf-8"),
  readFilePromise("../4-buildIn-modules/content/second.txt", "utf-8")

]).then((res) => {
  return writeFilePromise(
    "../4-buildIn-modules/content/result-async.txt",
    `This is Awesome: ${res}`
  )

}).catch((err) => {
  console.log(err);
})
*/

async function start() {
  try {
    const 
    first = await readFilePromise("../4-buildIn-modules/content/first.txt", "utf-8"),
    second = await readFilePromise("../4-buildIn-modules/content/second.txt", "utf-8")

  await writeFilePromise(
    "../4-buildIn-modules/content/result-async.txt",
    `This is Awesome: \n${first}\n${second}`
  );

  } catch(err) {
    console.log(err);
  }
}

start();