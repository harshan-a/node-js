const express = require("express");

const router = express.Router();

const {
  loginReq,
  signupReq,
  changeUserReq,
  deleteUserReq
} = require("../controllers/reqController.js");


router.get("/login/:username/:password", loginReq);
router.post("/signup", signupReq);
router.put("/change/:username", changeUserReq);
router.delete("/delete/:username", deleteUserReq);

module.exports = router;
