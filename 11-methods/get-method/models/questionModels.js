const mongoose = require("mongoose");

const qnSchema = new mongoose.Schema({
  category: {
    required: [true, "Must define the category"],
    type: String,
    trim: true,
    unique: true
  },
  questions: {
    type: [],
    required: true
  }
})

const Questions = mongoose.model("questions", qnSchema);

module.exports = Questions;