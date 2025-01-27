const {readFile, writeFile} = require('fs').promises;

async function start() {
  try {
    const 
    first = await readFile("../4-buildIn-modules/content/first.txt", "utf-8"),
    second = await readFile("../4-buildIn-modules/content/second.txt", "utf-8")

  await writeFile(
    "../4-buildIn-modules/content/result-async.txt",
    `This is Awesome: \n${first}\n${second}`
  );

  } catch(err) {
    console.log(err);
  }
}

start();