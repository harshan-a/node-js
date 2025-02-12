import {changeData} from "./component/sendReq.js";

const
usernameElem = document.querySelector(".username"),
passElem = document.querySelector(".password"),
confPassElem = document.querySelector(".conform-password"),
userNotFound = document.querySelector(".user-not-found"),
passwordNotMatch = document.querySelector(".password-not-match"),
changeBtn = document.querySelector(".change-btn");


document.querySelectorAll("input")
  .forEach((input) => {
    input.addEventListener("keydown", (e) => {
      userNotFound && userNotFound.classList.remove("errorOn");
      passwordNotMatch && passwordNotMatch.classList.remove("errorOn");
    })
  })

changeBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const username = usernameElem.value.trim();
  const password = passElem.value.trim();
  const conformPass = confPassElem.value.trim();

  if(!(password === conformPass)) {
    passwordNotMatch.classList.add('errorOn');
    confPassElem.value = '';
    return;
  }

  if(!(username && password)) {
    alert("INVALID_DATA");
    return;
  }

  const res = await changeData(username, password);
  const data = res.data;

  if(res.success === false) {
    if(data === "USER_NOT_FOUND") {
      userNotFound.classList.add('errorOn');
      usernameElem.value = '';
      passElem.value = '';
      confPassElem.value = '';
    } 
  
  } else if(res.success === true) {
    window.location.href = `/success?name=${data.username}&f=t`;
  }
})

