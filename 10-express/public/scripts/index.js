const btn = document.querySelector(".header2 .top .right .ham");
const bottomContainer = document.querySelector(".header2 .bottom");

let clickStatus;
btn.addEventListener("click", e => {
  if(!clickStatus) {
    e.target.classList.add("clicked");
    bottomContainer.classList.add("on");
    clickStatus = true;

  } else {
    e.target.classList.remove("clicked");
    bottomContainer.classList.remove("on")
    clickStatus = false;
  }
})


const main = document.querySelector(".main");
async function start() {
  const url = "https://harshan-a.github.io/html-css-youtube-project/";
  const res = await fetch(url);
  const data = await res.text();
  console.log(data);
}
// start();