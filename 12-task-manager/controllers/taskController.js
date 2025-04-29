const Task = require("../models/taskModel.js");
const CustomError = require("../error/customError.js");


const getAllTasks = async (req, res) => {
  // const origin = req.get("origin");
  // console.log(origin);
  const tasks = await Task.find({});
  return res.json(tasks);
}

const getSingleTask = async (req, res) => {
  const {id:taskId} = req.params;
  const task = await Task.findOne({_id: taskId});
  // const task = await Task.findById(taskId);
  if(!task) {
    throw new CustomError("Cannot find the task", 300, false);
  };

  res.status(200).json(task);

  // const {id} = req.params;
  // const task = await Task.findOne({_id: id});
  // // const tasks = readFile(tasksFilePath);
  // // const task = tasks.find(task => task._id === id);
  // if(task) {
  //   res.status(200).json(task);
  //   return;
  // }
  // res.status(404).json({
  //   success: false,
  //   data: "Task Not Found"
  // })
}

const createNewTask = async (req, res) => {
  const data = req.body;
  const task = await Task.create(data);

  res.status(200).json(task);
}

const editTask = async (req, res) => {
  const {id: taskId} = req.params;
  const data = req.body;

  // const task = await Task.updateOne({_id: taskId}, data, {
  //   runValidators: true
  // });
  
  // if(task.acknowledged && !task.modifiedCount) {
  //   return res.status(300).json({
  //     success: true,
  //     msg: "Nothing Changed",
  //   });
  // }

  const task = await Task.findOneAndUpdate({_id: taskId}, data, {
    new: true,
    runValidators: true,
  });

  if(!task) {
    throw new CustomError("Cannot find the task to edit", 300, false);
  }

  res.status(200).json({
    success: true,
    msg: "Edited Successfully",
    task
  });
  
  // const {id} = req.params;
  // const data = req.body;
  // let edited = false;
  // const tasks = readFile(tasksFilePath);

  // tasks.forEach(task => {
  //   if(task._id === id) {
  //     task.taskName = data.taskName;
  //     task.completed = data.completed;
  //     edited = true;
  //   }
  // })
   
  // if(edited) {
  //   writeTasksToFile(tasksFilePath, tasks);
  //   res.status(200).json({
  //     success: true,
  //     data: "Edited Successfully"
  //   })
  //   return;
  // }

  // res.status(404).json({
  //   success: false,
  //   data: "Error in editing the task"
  // });
}

const deleteTask = async (req, res) => {
  const {id:taskId} = req.params;
  const task = await Task.findOneAndDelete({_id: taskId});
  if(!task) {
    throw new CustomError("Cannot find the task to delete", 300, false);
  };

  res.status(200).json({
    success: true,
    msg: "Successfully deleted",
    task
  });


  // const {id} = req.params;
  // const tasks = readFile(tasksFilePath);
  // let deleted = false;
  // const newTasks = tasks.filter(task => {
  //   if(task.taskId === Number(id)) {
  //     deleted = true;
  //     return false;
  //   }
  //   return true;
  // });

  // if(deleted) {
  //   writeTasksToFile(tasksFilePath, newTasks);
  //   res.status(200).json({
  //     success: true,
  //     data: "Deleted Successfully"
  //   })
  //   return;
  // }

  // res.status(404).json({
  //   success: false,
  //   data: "Error in deleting the task"
  // });
}

module.exports = {
  getAllTasks,
  getSingleTask,
  createNewTask,
  editTask,
  deleteTask
}