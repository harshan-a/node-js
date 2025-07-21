const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const users = require("../data/users.json");
const {
  BadRequest, 
  UnauthorizedRequest,
  ConflictRequest,
} = require("../errors");
const Users = require("../models/userModel");


const register = async (req, res) => {
  const {username, password} = req.body;
  if(!username || !password) {
    throw new BadRequest("Provide username and password");
  }
  
  // users.forEach(user => {
  //   if(user.username === username) {
  //     throw new ConflictRequest("Username already taken");
  //   }
  // })

  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  const hashedPassword = await bcrypt.hash(password, 10);

  // users.push({username, password: hashedPassword});
  // fs.writeFileSync("./data/users.json", JSON.stringify(users));

  const user = await Users.create({username, password: hashedPassword});
  
  const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});

  res.status(200).json({msg: "Registered", token});
}

const login = async (req, res) => {
  if(!req.body) 
    throw new BadRequest("Provide username and password");

  const {username, password} = req.body;
  if(!username || !password) {
    throw new BadRequest("Provide username and password");
  }

  // let user;
  // users.forEach(u => {
  //   if(u.username === username) 
  //     user = u;
  // })
  const user = await Users.findOne({username});
  if(!user) 
    throw new UnauthorizedRequest("User not found");

  const checkPassword = await bcrypt.compare(password, user.password);
  if(!checkPassword) 
    throw new UnauthorizedRequest("Incorrect Password");

  const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});

  res.status(200).json({msg: "Logged in", token});
}

const dashboard = async (req, res, next) => {
  const {id:_id, username} = req.user;

  // data = users.find(u => u.username === user.username);
  const data = await Users.findOne({_id, username});
  if(!data) 
    throw new UnauthorizedRequest("User not found");

  const luckyNumber = Math.ceil(Math.random() * 100);
  res.status(200).json({msg: `-${luckyNumber}- Dashboard Activated Successfully...`, data});
}


module.exports = {login, dashboard, register};