const express = require("express");
const router = express.Router();

const {
  login, 
  dashboard, 
  register
} = require("../controllers/mainController.js");

const authenticationMiddleware = require("../middleware/auth.js");

// router.post("/login", login);
// router.get("/dashboard", dashboard);

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(authenticationMiddleware, dashboard);

module.exports = router;