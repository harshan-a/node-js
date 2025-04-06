const
inputElem = document.querySelector('.name-input'),
submitBtn = document.querySelector(".submit"),
nameConElem = document.querySelector(".name-container");

let html = '', timeout, timeOutForTooltip;


submitBtn.addEventListener("click", e => {
  start(e);
});

inputElem.addEventListener("keydown", e => {
  if(e.key === "Enter") start(e);
});

async function loadUsersData() {
  html = '';
  try {
    const res = await fetch("/api/users");
    if(!res.ok) throw res;

    const usersData = await res.json();
    if(usersData.length === 0) {
      nameConElem.innerHTML = `<span class="name">Users data is empty</span>`;
      return "EMPTY";
    }

    usersData.forEach(user => {
      const {_id: id, userName: name} = user;
      html += `
        <div class="name" data-name-id = "${id}">
          ${name}
          <div class="tooltip tooltip-${id}">
            <p class="tooltip-change">Change</p>
            <p class="tooltip-delete">Delete</p>
          </div>
        </div>
      `;
    })
    nameConElem.innerHTML = html;
    
  } catch(e) {
    nameConElem.innerHTML = `<span class="name">Can't fetch the data</span>`
    throw e;
  }
}

function startLoad() {
  return loadUsersData()
  .then((val) => {
    if(val === "EMPTY") return;
    addNameEvents();
  }).catch((err) => {
    console.log(err);
  })
}
startLoad();

async function start(e) {
  e.preventDefault();
  clearTimeout(timeout);

  try {
    const value = inputElem.value;
    const res = await postData(value);
    if(!res.ok) throw res;

    await startLoad();
    inputElem.value = "";
    
  } catch(e) {
    const {msg} = e;
    console.log(e);
    nameConElem.innerHTML = `<span class="name">${msg}</span>`;
    inputElem.value = "";
    
    timeout = setTimeout(async () => {
      await startLoad();
    }, 2000);
  }
}

async function postData(userName) {
  try {
    const res = await fetch('/api/users', {
      method: "POST", 
      headers: {
        "content-type": "application/json"
      }, 
      body: JSON.stringify({
        userName
      })
    });

    if(res.status >= 400) throw res;
    const data = await res.json();
    console.log("load user");
    return data;

  } catch(err) {
    const e = await err.json();
    console.log("error loading user");
    return e;
  }
}

async function changeUserData(id, newName) {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        userName: newName
      })
    })
    if(!res.ok) throw res;
    const data = await res.json();
    console.log(data);
    return data;

  } catch(err) {
    const error = await err.json();
    console.log(error);
    return error;
  }
}

async function deleteUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE"
    });
  
    if(!res.ok) throw res;
    const data = await res.json();
    console.log(data);

  } catch(err) {
    const error = await err.json();
    console.log(error);
  }
}

function addNameEvents() {
  const nameElems = document.querySelectorAll(".name");
  nameElems.forEach(nameElem => {
    const {nameId} = nameElem.dataset;

    const tooltip = document.querySelector(`.tooltip-${nameId}`);
    const tooltipChangeElem = document.querySelector(`.tooltip-${nameId} .tooltip-change`);
    const tooltipDeleteElem = document.querySelector(`.tooltip-${nameId} .tooltip-delete`);
    
    nameElem.addEventListener("mouseenter", e => {
      tooltip.style.display = "initial";
    })
    
    nameElem.addEventListener("mouseout", e => {
      timeOutForTooltip = setTimeout(() => {
        tooltip.style.display = "none";
      }, 200);
    })

    tooltip.addEventListener("mouseover", (e) =>{
      clearInterval(timeOutForTooltip);
      tooltip.style.display = "initial";
    })

    tooltipChangeElem.addEventListener("click", (e) => {
      tooltipChangeElem.innerHTML = `
        <p>Change</p>
        <input type='text' class='c-input'> 
        <button class="c-submit">submit</button>
      `;
      const tooltipInputElem = document.querySelector(`.tooltip-${nameId} .c-input`);
      const tooltipSubmitBtn = document.querySelector(`.tooltip-${nameId} .c-submit`);

      tooltipInputElem.focus();

      const submitEvent = async () => {
        const value = tooltipInputElem.value.trim();
        if(value) {
          await changeUserData(nameId, value);
          startLoad();
        }
      }
      
      tooltipSubmitBtn.addEventListener("click", submitEvent);
      tooltipInputElem.addEventListener("keydown", e => {
        if(e.key === "Enter") {
          submitEvent();
        }
      });
    })


    tooltipDeleteElem.addEventListener('click', e => {
      deleteUser(nameId)
      .then(() => {
        startLoad();
      });
    })
  })
}