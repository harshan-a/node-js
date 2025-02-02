const express = require("express"), path = require("path");

function server(products) {
  const app = express();
  
  app.get("/", (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>');
  });

  app.get("/api/products", (req, res) => {
    // res.json(products);
    const newProducts = products.map( product => {
      /*
      delete product.keywords; 
      // delete is used to delete the property in the object and it is permanent after this code the keywords(Property) can't available any more. //

      return product;
      */
      const newProduct = {};
      for(const property in product) {
        // property is string 
        if(property === "keywords") continue;
        newProduct[property] = product[property];
      }
      return newProduct;
    })
    res.json(newProducts)
  });

  /*
  app.get("/api/products/e43638ce-6aa0-4b85-b27f-e1d07eb678c6", (req, res) => {
    const product = products.find( product => product.id === "e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    res.json(product);
  })
  */

  // route params;
  app.get("/api/products/:id", (req, res) => {
    const {id} = req.params; // params return a String.
    const product = products.find( product => product.id === id);
    product 
    ? 
    res.json(product) 
    : 
    res.status(404).sendFile(path.resolve("../0-practice/2p/error.html"));
  });

  app.get("/api/products/:id/:property", (req, res) => {
    const {id, property} = req.params; // params return a String.
    const product = products.find( product => product.id === id);
    product 
    ? 
    (
      typeof product[property] === "object"
      ? res.json(product[property])
      : res.status(200).send(String(product[property]))
    )
    : 
    res.status(404).sendFile(path.resolve("../0-practice/2p/error.html"));
  });
  
  app.listen(5000, () => {
    console.log("Server is running on 5000...");
  });
}

module.exports = server;