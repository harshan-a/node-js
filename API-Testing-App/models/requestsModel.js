const mongoose = require("mongoose");


const reqResSchema = new mongoose.Schema({
  status_code: Number,
  status_text: String,
  data: String
})

const requestSchema = new mongoose.Schema({
  req_name: {
    type: String,
    required: [true, "Request name does not defined"],
    trim: true
  },
  req_method: {
    type: String,
    required: [true, "Request Method does not defined"],
    trim: true
  },
  req_url: {
    type: String,
    required: [true, "Request URL does not defined"],
    trim: true
  },
  contains_body: {
    type: Boolean,
    default: false
  },
  req_body: {
    type: String,
    required: function() {
      return this.contains_body;
    },
    trim: true
  },
  req_res: {
    type: reqResSchema,
    required: [true, "Request response not in correct format"]
  }
})

const Request = mongoose.model("request", requestSchema);

module.exports = Request;