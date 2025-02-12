const fs = require("fs");

const usersDataFilePath = "../../data/usersData.json";
const usersDataRaw = fs.readFileSync(usersDataFilePath, "utf-8");
let usersData = JSON.parse(usersDataRaw);

function getUserData(params) {
  const { username, password } = params;
  const user = usersData.find(user => user.username === username);
  if(!user) return "USER_NOT_FOUND";
  if(user.password !== password) return "PASSWORD_INCORRECT";
  
  return user;
}

function postUserData(data) {
  if(data.username && data.password) {
    const user = usersData.find(user => user.username === data.username);
    if(user) {
      return "ALREADY_A_MEMBER";
    }
    usersData.push(data);
    fs.writeFileSync(usersDataFilePath, JSON.stringify(usersData));
    return data;

  } else {
    return "INVALID_DATA";
  }
}

function changeUserPassword(data) {
  if(data.username && data.password) {
    let change = false; 
    usersData.forEach((user, i) => {
      if(user.username === data.username) {
        user.password = data.password;
        change = true;
      }
    })
    if(!change) return "USER_NOT_FOUND";
    fs.writeFileSync(usersDataFilePath, JSON.stringify(usersData));
    return data;
  }
}

function deleteUser(username) {
  let change = false;
  usersData = usersData.filter(user => {
    if(user.username === username) {
      change = true;
      return false;
    }
    return true;
  })
  if(!change) return "USER_NOT_FOUND";
  fs.writeFileSync(usersDataFilePath, JSON.stringify(usersData));
  return "deleted";
}


module.exports = {
  getUserData, postUserData, changeUserPassword, deleteUser
}