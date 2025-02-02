async function loadProducts() {
  const res = await fetch("https://supersimplebackend.dev/products");
  if(!res.ok)  {
    reject(res);
  }
  const data = await res.json();
  console.log("load Products");
  return data;
}
module.exports = loadProducts;