const Users = require("../models/usersModel.js");


const createUserReq = async (req, res) => {
  const user = await Users.create(req.body);
  res.status(200).json({ok: true, data: user});
};

const changeUserReq = async (req, res) => {
  const {id:userId} = req.params;
  const data = req.body;

  const user = await Users.findOneAndUpdate({_id: userId}, data, {
    new: true,
    runValidators: true
  })
  if(!user) {
    return res.status(404).json({ok: false, msg: "User not found for update"});
  }
  res.status(200).json({ok: true, data: user, msg: "Changed"});
};

const removeUserReq = async (req, res) => {
  const {id:userId} = req.params;
  
  const user = await Users.findOneAndDelete({_id: userId});
  if(!user) {
    return res.status(404).json({ok: false, msg: "User not found for delete"});
  } 
  res.status(200).json({ok: true, msg: "Deleted", data: user});
};

const getUsersReq = async (req, res) => {
  const users = await Users.find({});
  res.status(200).json(users);
};

const getUserReq = async (req, res) => {
  const {id: userId} = req.params;

  const user = await User.findOne({_id: userId});
  if(!user) {
    return res.status(404).json({ok: false, msg: "User not found"});
  }
  res.status(200).json({ok: true, data: user});
};

module.exports = {
  createUserReq, 
  changeUserReq,
  removeUserReq,
  getUsersReq,
  getUserReq
}