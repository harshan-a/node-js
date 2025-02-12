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
        <div class="password-container">
          <label for="password" type="password">
            Password <span>*</span>
          </label>
          <input name="password" class="password" type="password" />
          <span class="password-incorrect error">password incorrect</span>
        </div>
        <button type="submit" class="submit-btn">Login</button>
        <a class="forgot-password" href="/forgetpassword">Forget Password</a>
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
        <div class="password-container">
          <label for="password" type="password">
            Password <span>*</span>
          </label>
          <input name="password" class="password" type="password" />
        </div>
        <div class="consform-password-container">
          <label for="conform-password" type="password">
            Conform password <span>*</span>
          </label>
          <input name="conform-password" class="conform-password" type="password" />
          <span class="password-not-match error">password does not match</span>
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
  passElem = document.querySelector(".password"),
  confPassElem = document.querySelector(".conform-password"),
  userNotFound = document.querySelector(".user-not-found"),
  passwordIncorrect = document.querySelector(".password-incorrect"),
  alreadyAMember = document.querySelector(".already-a-member"),
  passwordNotMatch = document.querySelector(".password-not-match");
  
  
  swapBtn.addEventListener("click", e => {
    status_code = status_code === "login" ? "signup" : "login";
    renderForm();
  });

  document.querySelectorAll("input")
    .forEach((input) => {
      input.addEventListener("keydown", (e) => {
        userNotFound && userNotFound.classList.remove("errorOn");
        passwordIncorrect && passwordIncorrect.classList.remove("errorOn");
        alreadyAMember && alreadyAMember.classList.remove("errorOn");
        passwordNotMatch && passwordNotMatch.classList.remove("errorOn");
      })
    })

  submitBtn.addEventListener("click", async e => {
    e.preventDefault();

    const username = usernameElem.value.trim();
    const pass = passElem.value.trim();

    if(confPassElem) {
      const confPassValue = confPassElem.value.trim();
      if(confPassValue !== pass) {
        passwordNotMatch.classList.add('errorOn');
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
        
      } else if(data === "PASSWORD_INCORRECT") {
        passwordIncorrect.classList.add('errorOn');
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

const url = new URL(window.location.href);
const d = url.searchParams.get("d");

if(d) alert("Successfully deleted");
