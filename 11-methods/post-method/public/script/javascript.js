const
inputElem = document.querySelector('.name'),
submitBtn = document.querySelector(".submit"),
nameConElem = document.querySelector(".name-container");
let html = '', timeout;


submitBtn.addEventListener("click", e => {
  start(e);
});

inputElem.addEventListener("keydown", e => {
  if(e.key === "Enter") start(e);
});

async function loadUsersdata() {
  try {
    const res = await fetch("/api/users");
    if(!res.ok) throw res;

    const usersData = await res.json();
    usersData.forEach(user => {
      const name = user.userName;
      html += `<span class="name">${name}</span>`;
    })
    nameConElem.innerHTML = html;
    
  } catch(e) {
    console.log(e);
    nameConElem.innerHTML = `<span class="name">Can't fetch the data</span>`
  }
}
loadUsersdata();

async function start(e) {
  e.preventDefault();
  clearTimeout(timeout);

  try {
    const value = inputElem.value;
    const res = await postData(value);
    if(!res.ok) throw res;
    const {name} = res;
    html += `<span class="name">${name}</span>`;
    nameConElem.innerHTML = html;
    inputElem.value = '';
    
  } catch(e) {
    const {msg} = e;
    nameConElem.innerHTML = `<span class="name">${msg}</span>`;

    timeout = setTimeout(() => {
      nameConElem.innerHTML = html;
    }, 1000);
  }
}

async function postData(name) {
  try {
    const res = await fetch('/api/users', {
      method: "POST", 
      headers: {
        "content-type": "application/json"
      }, 
      body: JSON.stringify({
        name
      })
    });

    if(!res.ok) throw res;
    const data = await res.json();
    console.log("load user");
    return data;

  } catch(err) {
    const e = await err.json();
    console.log("error loading user");
    return e;
  }
}