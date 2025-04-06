const express = require('express');
const app = express();
const taskRoute = require("./routers/taskRouter.js");
const connectDB = require("./db/connect.js");
require("dotenv").config();
const notFound = require("./middleware/not-found.js");
const errorHandlerMiddleware = require('./middleware/errorHandler.js');

// middleware
app.use(express.static("./public"));
app.use(express.json());

/*
// app.get("/api/v1/tasks", (req, res) => {
//   res.send("get all tasks");
// })

// app.get("/api/v1/tasks/:id", (req, res) => {
//   const {id} = req.params;
//   res.send("get a single task " + id);
// })

// app.post("/api/v1/tasks", (req, res) => {
//   const {data} = req.body;
//   res.send(data + "\n" + "create new task");
// })

// app.patch("/api/v1/tasks/:id", (req, res) => {
//   const {id} = req.params;
//   res.send("edit the task " + id);
// })

// app.delete("/api/v1/tasks/:id", (req, res) => {
//   const {id} = req.params;
//   res.send("delete the task " + id);
// })
*/

// routes
app.use("/api/v1/tasks", taskRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);


const PORT = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    console.log("CONNECTED TO DATABASE");
    app.listen(PORT, () => console.log('Server is running on Port ' + PORT + '...'));

  } catch(err) {
    console.log(err);
  }
}

start();