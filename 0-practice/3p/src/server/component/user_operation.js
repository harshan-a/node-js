const fs = require("fs");

const usersDataFilePath = "../../data/usersData.json";
const usersDataRaw = fs.readFileSync(usersDataFilePath, "utf-8");
const usersData = JSON.parse(usersDataRaw);

function getUserData(params) {
  const { username, passward } = params;
  const user = usersData.find(user => user.username === username);
  if(!user) return "USER_NOT_FOUND";
  if(user.passward !== passward) return "PASSWARD_INCORRECT";
  
  return user;
}

function postUserData(data) {
  if(data.username && data.passward) {
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

module.exports = {
  getUserData, postUserData
}