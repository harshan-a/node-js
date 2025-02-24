const { getUsersData, writeUsersData } = require("../src/server/component/writeData.js");
let usersData  = getUsersData();



const createUserReq = (req, res) => {
  const { name } = req.body;
  if(name) {
    const data = {
      userId: usersData[usersData.length - 1].userId + 1,
      userName: name
    };
    usersData.push(data);
    writeUsersData(usersData);
    return res.status(200).json({ok: true, data});
  }
  res.status(502).json({ok: false, msg: "Please, provide credentials"});
};

const changeUserReq = (req, res) => {
  const {id} = req.params;
  const {userName} = req.body;

  let change;
  usersData.forEach(user => {
    if(user.userId === Number(id)) {
      user.userName = userName;
      find = true;
    }
  })
  if(change) {
    writeUsersData(usersData);
    return res.status(200).send("changed");
  }
  return res.status(503).send("not changed");
};

const removeUserReq = (req, res) => {
  const {id} = req.params;
  
  usersData = usersData.filter(user => user.userId !== Number(id));
  writeUsersData(usersData);
  return res.status(200).send("deleted");
};

const getUsersReq = (req, res) => {
  res.status(200).json(usersData);
};

const getUserReq = (req, res) => {
  const {userId} = req.params;
  const user = usersData.find(user => Number(userId) === user.userId);
  user 
  ?
  res.status(200).json(user)
  :
  res.status(502).json({ok: false, msg: "Invalid"});
};

module.exports = {
  createUserReq, 
  changeUserReq,
  removeUserReq,
  getUsersReq,
  getUserReq
}