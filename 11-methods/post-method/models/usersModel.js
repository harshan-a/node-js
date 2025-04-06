const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    required: [true, "Must provide the user name {VALUE}"],
    type: String,
    trim: true,
    maxlength: [20, "Max 20 character is allowed {VALUE}"]
  }
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
