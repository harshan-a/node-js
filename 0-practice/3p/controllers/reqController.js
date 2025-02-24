const { 
  getUserData, 
  postUserData, 
  changeUserPassword,
  deleteUser
} = require("../src/server/component/user_operation.js");



const loginReq =  (req, res) => {
  const {params} = req;
  const userData = getUserData(params);
  if(userData === "USER_NOT_FOUND") {
    res.status(503).json({success: false, data: "USER_NOT_FOUND"});
    return;

  } else if(userData === "PASSWORD_INCORRECT") {
    res.status(401).json({success: false, data: "PASSWORD_INCORRECT"});
    return;
  
  } 
  res.status(200).json({success: true, data: userData});
};

const signupReq = (req, res) => {
  const { body } = req;
  const data = postUserData(body);
  if(data === "INVALID_DATA") {
    res.status(502).json({success: false, data: "INVALID_DATA"});
    return;

  } else if(data === "ALREADY_A_MEMBER") {
    res.status(502).json({success: false, data: "ALREADY_A_MEMBER"});
    return;
  }
  res.status(200).json({success: true, data});  
};

const changeUserReq = (req, res) => {
  const {username} = req.params;
  const {passward} = req.body;
  const data = changeUserPassword({username, passward});

  if(data === "USER_NOT_FOUND") {
    res.status(503).json({success: false, data});
    return;
  }
  res.status(200).json({success: true, data});
};

const deleteUserReq = (req, res) => {
  const {username} = req.params;
  const data = deleteUser(username);

  if(data === "USER_NOT_FOUND") {
    res.status(503).json({success: false, data});
    return;
  }
  res.status(200).json({success: true, data});
};


module.exports = {
  loginReq, signupReq, changeUserReq, deleteUserReq
}