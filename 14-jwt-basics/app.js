// console.log("Hello, World!!!");
require("dotenv").config();

const 
  express = require("express"),
  cors = require("cors"),

  app = express(),
  PORT = process.env.PORT || 5000,

  connectDB = require("./db/connect.js");
  errorHandlerMiddle = require("./middleware/error-handler.js"),
  notFound = require("./middleware/not-found.js"),
  // const CustomError = require("./errors/customError.js");
  mainRouter = require("./routers/mainRouter.js");


// middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:4000/"
}));


// app.get("/", (req, res) => {
//   // console.log(req.get("host"));
//   // throw new CustomError({msg: "hleo", statusCode: 400, success: false});
//   res.send("hello");
// })

// Routers
app.use("/api/v1/", mainRouter);


// Error Handling Middlewares
app.use(notFound);
app.use(errorHandlerMiddle);


// start server
const start = async () => {
  try {
    const db = await connectDB(process.env.MONGO_URI);
    db && console.log("CONNECTED TO DATABASES");
    app.listen(PORT, err => {
      if(err) 
        return console.log("Error in running the server");
      console.log("Server is running on port " + PORT + "...");
    })

  } catch(err) {
    console.log(err);
  }
}

start();