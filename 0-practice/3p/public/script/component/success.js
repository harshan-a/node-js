const main = document.querySelector("main");

const url = new URL(window.location.href);
const username = url.searchParams.get("name");
const forgetpass = url.searchParams.get("f");

if(forgetpass) {
  alert("Passward changed successfully");
}

main.innerHTML = `
  <h1>Welcome ${username}</h1>
  <h3>This is the home page get by the server</h3>
  <h5 class="home-header">
    Go to Home Page <button class="home-btn">Click here</button>
  </h5>
  <h5 class="delete-header">
    If you want to delete this account <button class="delete-btn">Click here</button>
  </h5>
`;

const homeBtn = document.querySelector(".home-header .home-btn");
const deleteBtn = document.querySelector(".delete-header .delete-btn");


homeBtn.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "/";
  }, 50);
})

deleteBtn.addEventListener("click", async() => {

  try {
    const res = await fetch(`/api/delete/${username}`, {
      method: 'DELETE'
    });
  
    if(res.status > 200) throw res;
  
    const data = await res.json();
    console.log(data.data);
  
    setTimeout(() => {
      window.location.href = "/?d=true";
    }, 50);
     
  } catch(err) {
    console.log(err);
  }
})