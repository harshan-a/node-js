const express = require("express"), path = require("path");

/*
module.exports = function start(products) {
  const app = express();

  app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1><a href='/data/9442686138'>Products</a><br /><a href='/data/8838652700'>Profile</a>");
  })

  app.get("/data/:fileId", (req, res) => {
    const {fileId} = req.params;
    const fileIdNum = Number(fileId);
     
    if(fileIdNum === 9442686138) {
      res.json(products);

    } else if(fileIdNum === 8838652700) {
      res.json({name: "Harshan", age: 20});

    } else {
      res.sendFile(path.resolve("../0-practice/2p/error.html"))
    }

  })
  
  app.listen(5000, () => {
    console.log("Server is running on Port 5000....");
  })
}
*/

module.exports = function start(products) {
  const app = express();

  app.use(express.static("./public"));

  app.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve("../0-practice/2p/index.html"));
  })

  app.get("/data/:fileId", (req, res) => {
    // params are part of url 
    const {fileId} = req.params;
    const fileIdNum = Number(fileId);

    //query is data stored in url after qnestion Mark
    const {search, count} = req.query;

    if(fileIdNum === 9442686138) {
      // to copy an array into another var, can't asign as arr2 = arr1
      // because var of array stores the address of the array not the actual array values
      // so to copy the array another var use this arr2 = [...arr1]
      // or arr2 = arr1.slice()
      let newProducts = [...products];
      if(search){
        newProducts = products.filter((product) => {
          const name = product.name.toLowerCase();
          return name.startsWith(search);
        })
      }

      if(count) {
        newProducts = newProducts.splice(0, Number(count));
        // splice(a, b) => a is start index, b is number of elements to get from the index value a.
        // slice(a, b) => a is start index, b is end index. always(a>b) 
      }

      if(newProducts.length < 1)
        return res.status(200).json({success: true, data: []});

      return res.status(200).json(newProducts);

    } else if(fileIdNum === 8838652700) {
      return res.status(200).json([
        { 
          name: "Harshan",
          age: 20
        },
        {
          name: "Harsha", 
          age: 20
        },
        {
          name: "Harsh", 
          age: 20
        }
      ]);
    }

    res.sendFile(path.resolve("../0-practice/2p/error.html"));
  })

  app.get("/about", (req, res) =>{
    res.status(200).sendFile(path.resolve("../0-practice/2p/about.html"));
  })

  app.get("/contact", (req, res) =>{
    res.status(200).sendFile(path.resolve("../0-practice/2p/contact.html"));
  })

  app.get("/project", (req, res) =>{
    res.status(200).sendFile(path.resolve("../0-practice/2p/project.html"));
  })

  app.all("*", (req, res) => {
    res.send(`URL:${req.url} is incorrect.`)
  })

  app.listen(5000, () => {
    console.log("Server is running on Port 5000...");
  })
}
