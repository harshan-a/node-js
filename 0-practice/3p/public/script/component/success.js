const main = document.querySelector("main");

const url = new URL(window.location.href);
const username = url.searchParams.get("name");

main.innerHTML = `
  <h1>Welcome ${username}</h1>
  <h4>This is the home page get by the server</h4>
`;