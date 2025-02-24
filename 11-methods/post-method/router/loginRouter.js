const express = require('express');

const router = express.Router();

const {formLoginReq} = require("../controllers/loginCon.js");

router.post("/", formLoginReq);

module.exports = router;