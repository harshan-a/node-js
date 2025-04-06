const mongoose = require('mongoose');

//const connectionString = 'mongodb+srv://harshan:harshan@nodejspractice.bl6kq.mongodb.net/12-TASK-MANAGER?retryWrites=true&w=majority&appName=NodejsPractice';

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;



// Database connection;
// Get the connection string from the database;
// install mongoose package using npm;
// mongoose.connect(connectionString), this connect method is used to connect to database is async method and return promise;
// connection to database is established;