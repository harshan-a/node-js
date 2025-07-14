const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  BadRequest, 
  UnauthorizedRequest,
  ConflictRequest,
} = require("../errors");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    maxlength: [20, "Usename should not exceed 20 char"],
    minlength: [3, "Username should have more then 3 char"],
    unique: [true, "Username already taken"],
    index: true,
    select: true,
    // uppercase: true,
    // lowercase: true,
    // enum: ["user1", "user2"]
    // enum: {
    //   values: ["user1", "user2"],
    //   message: "Invalid username"
    // }
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    trim: true,
    // set: function(pass) {
    //   if(!pass) throw new Error("err");
    //   const hashedPassword = bcrypt.hashSync(pass, 10);
    //   return hashedPassword;
    // },
  }
})

module.exports = mongoose.model("Users", userSchema);