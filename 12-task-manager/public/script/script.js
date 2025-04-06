import {
  loadTasks,
  postTask,
  deleteTask
} from '../data/task.js';

loadTasks()
.then((tasks) => {
  start(tasks);

}).catch((err) => {
  console.log(err);
});

function start(tasks) {

  const mainElem = document.querySelector(".main-elem");
  
  const mainElemHTML = `
    <form>
      <p>Enter Task</p>
      <input type="text" placeholder="eg: task1" class="task-input-bar">
      <div class="input-msg"></div>
      <button class="sub-btn">Submit</button>
    </form>
  
    <content>
      <div class="todo-list-wrapper">
      </div>
    </content>
  `;
  
  function updateTasksHTML() {
    let contentHTML = '';
    tasks.forEach(task => {
      const {_id: taskId} = task;
      contentHTML += `
        <div class="todo-task">
          <span>
            ${task.taskName} ${task.completed ? "(completed)": ""}
          </span>
          <div class="todo-list-btns">
            <button class="edit-btn" data-task-id=${taskId}>
              edit
            </button>
            <button class="delete-btn" data-task-id=${taskId}>
              delete
            </button>
          </div>
        </div>
      `;
    });
  
    document.querySelector('.todo-list-wrapper').innerHTML = contentHTML;
  };
  
  mainElem.innerHTML = mainElemHTML;
  updateTasksHTML();
  
  
  let inputMsgTimeout;
  const editBtnList = document.querySelectorAll(".todo-task .todo-list-btns .edit-btn");
  const deleteBtnList = document.querySelectorAll(".todo-task .todo-list-btns .delete-btn");
  const submitBtn = document.querySelector("form .sub-btn");
  const inputMsgElem = document.querySelector(".input-msg");
  const taskInputBar = document.querySelector(".task-input-bar");
  
  
  
  editBtnList.forEach(btn => {
    const {taskId} = btn.dataset;
    btn.addEventListener("click", e => {
      window.location.href = `editTask.html?id=${taskId}`;
    })
  });
  
  deleteBtnList.forEach(btn => {
    const {taskId} = btn.dataset;
    btn.addEventListener("click", async e => {
      try {
        const res = await deleteTask(taskId);
        if(res.success) {
          tasks = tasks.filter(task => task._id !== taskId);
          start(tasks);

        } else {
          alert(res.msg);
        }

      } catch (err) {
        console.log(err);
      }
    })
  })
  
  
  submitBtn.addEventListener("click", async e => {
    try {
      e.preventDefault();
      clearTimeout(inputMsgTimeout);
    
      const value = taskInputBar.value.trim();
      if(value === "" && !value) {
        inputMsgElem.innerText = "Please, Enter The Task...";
        inputMsgElem.style.color = "lightcoral";
        
      } else {
        const data = await postTask({taskName: value});
        tasks.push(data);
        updateTasksHTML();
        inputMsgElem.innerText = "Task Added Successfully";
        inputMsgElem.style.color = "lightgreen";
        taskInputBar.value = "";
      };
      
      inputMsgTimeout = setTimeout(() => {
        inputMsgElem.innerText = "";
        start(tasks);
      }, 1000);

    } catch(err) {
      console.log(err);
      alert("Something error...");
    }
  });
  
  async function get() {
    // const res1 = await fetch("/api/v1/tasks", {
    //   method: "GET",
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // })
    const res2 = await fetch("/api/v1/tasks/67e2aec5cd0c0e7a559fc681", {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    // const res3 = await fetch('/api/v1/tasks', {
    //   method: "POST",
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     taskName: "Task has been posted"
    //   })
    // })
    const res4 = await fetch("/api/v1/tasks/67e2aec5cd0c0e7a559fc681", {
      method: "PATCH",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        taskName: "harshan"
      })
    })
    const res5 = await fetch("/api/v1/tasks/67dae2a2036ee4c49f51356a", {
      method: "DELETE",
      headers: {
        'content-type': 'application/json'
      }
    })
    // const data1 = await res1.json();
    const data2 = await res2.json();
    // const data3 = await res3.json();
    const data4 = await res4.json();
    const data5 = await res5.json();
    // console.log("all tasks");
    // console.log(data1);
    console.log("single task ");
    console.log(data2);
    // console.log("post");
    // console.log(data3);
    console.log("patch");
    console.log(data4);
    console.log("delete");
    console.log(data5);
  }
  get();

  // const app = go();
  // function go() {
  //   return () => {
  //     console.log("err");
  //   }
  // }
  // console.log(typeof app);
  
  // const str = "hello world";
  // const arr = ["hello", "world"];
  // console.log(arr.reverse().join(" "));
  // console.log(str.split(" "));
}