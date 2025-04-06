const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getSingleTask,
  createNewTask,
  editTask,
  deleteTask
} = require("../controllers/taskController.js");

const asyncMiddleware = require("../middleware/async.js");

// router.get("/", getAllTasks);
// router.get("/:id", getSingleTask);
// router.post("/", createNewTask);
// router.patch("/:id", editTask);
// router.delete("/:id", deleteTask);

router.route('/')
  .get(asyncMiddleware(getAllTasks))
  .post(asyncMiddleware(createNewTask));

router.route('/:id')
  .get(asyncMiddleware(getSingleTask))
  .patch(asyncMiddleware(editTask))
  .delete(asyncMiddleware(deleteTask));


module.exports = router;