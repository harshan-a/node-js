const express = require('express');
const router = express.Router();

const {
  createUserReq, 
  changeUserReq,
  removeUserReq,
  getUsersReq,
  getUserReq
} = require("../controllers/usersCon.js");
const asyncMiddlware = require("../middleware/async.js");


// router.post("/", createUserReq);
// router.put("/:id", changeUserReq);
// router.delete("/:id", removeUserReq);
// router.get("/", getUsersReq);
// router.get("/:userId", getUserReq);

router.route("/")
  .get(asyncMiddlware(getUsersReq))
  .post(asyncMiddlware(createUserReq));

router.route("/:id")
  .put(asyncMiddlware(changeUserReq))
  .delete(asyncMiddlware(removeUserReq))
  .get(asyncMiddlware(getUserReq));


module.exports = router;