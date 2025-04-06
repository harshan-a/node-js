const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: [true, "task name must be provided"],
    trim: true,
    maxLength: [20, "task name should not exceeds 20 char"]
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("tasks", taskSchema);


// schema is the structure of our data that stored in collections (i.e columns in tables in structured database);
// new mongoose.Schema({structure with validation});
// to create collection using the model method in mongoose;
// mongoose.model(model_name(i.e table_name), schema);
// model method return object, by using this object to perform CURD operation;