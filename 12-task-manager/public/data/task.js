export async function loadTasks() {
  const res = await fetch('api/v1/tasks', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  });
  
  if(res.status >= 400) {
    throw await res.json();
  }

  const tasks = await res.json();
  return tasks;
}

export async function getSingleTask(id) {
  const res = await fetch(`/api/v1/tasks/${id}`, {
    method: "GET",
    headers: {
      'content-type': 'application/json'
    }
  })

  if(res.status >= 400) {
    throw await res.json();
  }

  const task = await res.json();
  return task;
}

export async function postTask(data) {
  const res = await fetch("api/v1/tasks", {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if(res.status >= 400) {
    throw await res.json();
  } 
  const resData = await res.json();
  return resData;
}

export async function patchTask(taskId, data) {
  const res = await fetch(`/api/v1/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if(res.status >= 400) throw await res.json();

  const resData = await res.json();
  return resData;
}

export async function deleteTask(id) {
  const res = await fetch(`api/v1/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  });

  if(res.status >= 400) throw await res.json();

  const data = await res.json();
  return data;
}