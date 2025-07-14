export const loginRequest = async function(user) {
  try {
    const res = await fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const result = await res.json();
    if(res.status >= 400) throw result;

    return {success: true, data: result};

  } catch(err) {
    return {success: false, data: err};
  }
}

export const registerRequest = async (user) => {
  try {
    const res = await fetch("/api/v1/register", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const result = await res.json();
    if(res.status >= 400) throw result;

    return {success: true, data: result};

  } catch(err) {
    return {success: false, data: err};
  }
}

export async function getDashboardData(token) {
  try {
    const res = await fetch("/api/v1/dashboard",{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const result = await res.json();
    if(res.status >= 400) throw result;

    return {success: true, data: result};

  } catch(err) {
    return {success: false, data: err};
  }
}