const Qn = require("../models/questionModels.js");

const createQn = async (req, res) => {
  const qn = await Qn.create(req.body);
  res.status(200).json(qn);
}

const getAllQn = async (req, res) => {
  const qns = await Qn.find({});
  res.status(200).json(qns);
}

module.exports = {
  createQn, getAllQn
}