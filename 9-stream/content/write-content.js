const {writeFile} = require("fs").promises;

const start = async (i) => {
  try{
    await writeFile(
      "./big.txt", 
      `Hello, World!!! ${i}\n`,
      {flag: 'a'}
    )

  } catch(err){
    console.log(err)
  };
}

for(let i = 0; i < 1000; i++) {
  start(i);
}