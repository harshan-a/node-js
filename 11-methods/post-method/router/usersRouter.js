const express = require('express');

const router = express.Router();

const {
  createUserReq, 
  changeUserReq,
  removeUserReq,
  getUsersReq,
  getUserReq
} = require("../controllers/usersCon.js");


// router.post("/", createUserReq);
// router.put("/:id", changeUserReq);
// router.delete("/:id", removeUserReq);
// router.get("/", getUsersReq);
// router.get("/:userId", getUserReq);

router.route("/").get(getUsersReq).post(createUserReq);
router.route("/:id").put(changeUserReq).delete(removeUserReq);
router.route("/:userId").get(getUserReq);


module.exports = router;