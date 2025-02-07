import {req} from "./component/sendReq.js";


let status_code = 'login';

function renderForm() {
  const html = `
    <h2>${status_code === "login" ? "Login" : "Signup"}</h2>

    ${
      status_code === 'login'
      ?
      `<form class="login-form">
        <div class="username-container">
          <label for="username">
            Username <span>*</span>
          </label>
          <input name="username" class="username" type="text" />
          <span class="user-not-found error">user not found ( signup please )</span>
        </div>
        <div class="passward-container">
          <label for="passward" type="passward">
            Passward <span>*</span>
          </label>
          <input name="passward" class="passward" type="passward" />
          <span class="passward-incorrect error">passward incorrect</span>
        </div>
        <button type="submit" class="submit-btn">Login</button>
      </form>

      <div class="swap-container">
        <span class="login-span">Login</span>
        <button class="swap-btn ${status_code}"><span class="swap">*</span></button>
        <span class="signup-span opa">Signup</span>
      </div>`
      :
      `<form class="login-form">
        <div class="username-container">
          <label for="username">
            Username <span>*</span>
          </label>
          <input name="username" class="username" type="text" />
          <span class="already-a-member error">already a member ( click login )</span>
        </div>
        <div class="passward-container">
          <label for="passward" type="passward">
            Passward <span>*</span>
          </label>
          <input name="passward" class="passward" type="passward" />
        </div>
        <div class="consform-passward-container">
          <label for="conform-passward" type="passward">
            Conform Passward <span>*</span>
          </label>
          <input name="conform-passward" class="conform-passward" type="passward" />
          <span class="passward-not-match error">passward does not match</span>
        </div>
        <button type="submit" class="submit-btn">
          ${status_code === "login" ? "Login" : "Signup"}
        </button>
      </form>

      <div class="swap-container">
        <span class="login-span opa">Login</span>
        <button class="swap-btn ${status_code}"><span class="swap">*</span></button>
        <span class="signup-span">Signup</span>
      </div>`
    }
  `;

  document.querySelector('main').innerHTML = html;

  const 
  swapBtn = document.querySelector(".swap-btn"),
  submitBtn = document.querySelector(".submit-btn"),
  usernameElem = document.querySelector(".username"),
  passElem = document.querySelector(".passward"),
  confPassElem = document.querySelector(".conform-passward"),
  userNotFound = document.querySelector(".user-not-found"),
  passwardIncorrect = document.querySelector(".passward-incorrect"),
  alreadyAMember = document.querySelector(".already-a-member"),
  passwardNotMatch = document.querySelector(".passward-not-match");
  
  
  swapBtn.addEventListener("click", e => {
    status_code = status_code === "login" ? "signup" : "login";
    renderForm();
  });

  document.querySelectorAll("input")
    .forEach((input) => {
      input.addEventListener("keydown", (e) => {
        userNotFound && userNotFound.classList.remove("errorOn");
        passwardIncorrect && passwardIncorrect.classList.remove("errorOn");
        alreadyAMember && alreadyAMember.classList.remove("errorOn");
        passwardNotMatch && passwardNotMatch.classList.remove("errorOn");
      })
    })

  submitBtn.addEventListener("click", async e => {
    e.preventDefault();

    const username = usernameElem.value.trim();
    const pass = passElem.value.trim();

    if(confPassElem) {
      const confPassValue = confPassElem.value.trim();
      if(confPassValue !== pass) {
        passwardNotMatch.classList.add('errorOn');
        confPassElem.value = '';
        return;
      }
    }

    if(!(username && pass)) {
      alert("INVALID_DATA");
      return;
    }

    const res = await req(status_code, username, pass);
    const data = res.data;

    if(res.success === false) {
      if(data === "USER_NOT_FOUND") {
        userNotFound.classList.add('errorOn');
        usernameElem.value = '';
        passElem.value = '';
        
      } else if(data === "PASSWARD_INCORRECT") {
        passwardIncorrect.classList.add('errorOn');
        passElem.value = '';
        
      } else if(data === "ALREADY_A_MEMBER") {
        alreadyAMember.classList.add('errorOn');
        usernameElem.value = '';
        confPassElem.value = '';  
        passElem.value = '';
      } 

    } else if(res.success === true) {
      window.location.href = `/success?name=${data.username}`;
    }
  })
}

renderForm();
