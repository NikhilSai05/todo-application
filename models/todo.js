const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name cannot be blank",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const toDo = mongoose.model("Todo", todoSchema);

module.exports = toDo;
