import {getSingleTask, patchTask} from "../data/task.js";

async function start() {
  try {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
  
    const matchedTask = await getSingleTask(id);
    if(matchedTask.success === false) {
      throw matchedTask;
    }
 
    const taskIdElem = document.querySelector(".ans p");
    taskIdElem.innerText = matchedTask._id;
   
    const taskNameInput = document.querySelector(".ans input[type='text']");
    taskNameInput.value = matchedTask.taskName;
  
    const taskComElem = document.querySelector(".ans input[type='checkbox']");
    matchedTask.completed && taskComElem.click();
  
    const submitBtn = document.querySelector("form .sub-btn"); 
    let subMsgTimer; 

    submitBtn.addEventListener('click', async e => {
      try {
        e.preventDefault();
        clearTimeout(subMsgTimer);
    
        const taskName = taskNameInput.value.trim();
        if(taskName === '' && !taskName) return alert("Must provide task name");
        const completed = taskComElem.checked;
        const data = {
          taskName,
          completed 
        };
        const msgElem = document.querySelector(".msg");
        const res = await patchTask(id, data);
        msgElem.innerText = res.msg;
  
        subMsgTimer = setTimeout(() => {
          msgElem.innerText = "";
        }, 1000);

      } catch (err) {
        console.log(err);
      } 
    });

    const backToTasksBtn = document.querySelector(".back-btn");
    backToTasksBtn.addEventListener("click", e => {
      window.location.href = "/";
    })

  } catch (err) {
    console.log(err);
  }
}
start();