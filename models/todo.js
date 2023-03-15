const mongoose = require("mongoose")
const todoSchema = new mongoose.Schema({
    name:String,
    createdOn:Date
});

const toDo = mongoose.model(
    "Todo",
    todoSchema
);

module.exports=toDo;