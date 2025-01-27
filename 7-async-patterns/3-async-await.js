import { readText, writeText } from "./2-promise-setup.js";
// const {readText, writeText} = require('./promise-setup.js');

async function start() {
  try {
    const
      first = await readText("../4-buildIn-modules/content/first.txt"),
      second = await readText("../4-buildIn-modules/content/second.txt");

    await writeText("../4-buildIn-modules/content/result-async.txt", [first, second]);

  } catch (err) {
    console.log(err);
  }
}
start();