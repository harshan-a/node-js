const express = require("express");
const router = express.Router();
const {createQn, getAllQn} = require("../controllers/questionController.js");
const asyncMiddleware = require("../middleware/async.js");


router.route("/").get(asyncMiddleware(getAllQn)).post(asyncMiddleware(createQn));

module.exports = router;