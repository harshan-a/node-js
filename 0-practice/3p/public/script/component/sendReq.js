export async function req(status_code, username, pass) {
  if(status_code === 'login') {
    const data = await getData(username, pass);
    return data;
  }
  if(status_code === 'signup') {
    const data = await postData(username, pass);
    return data;
  }
}

async function getData(username, pass) {
  try {
    const res = await fetch(`/api/login/${username}/${pass}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })

    if(!res.ok) throw res;

    const data = await res.json();
    return data;

  } catch(e) {
    const err = await e.json();
    return err;
  }
}

async function postData(username, password) {
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    if(!res.ok) throw res;

    const data = res.json();
    return data;

  } catch(e) {
    const err = await e.json();
    return err;
  }
}

export async function changeData(username, password) {
  try {
    const res = await fetch(`/api/change/${username}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        password
      })
    });
    if(!res.ok) throw res;

    const data = await res.json();
    return data;

  } catch(e) {
    const err = await e.json();
    return err;
  }
}