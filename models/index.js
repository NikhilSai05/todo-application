const mongoose=require("mongoose");
const toDo = require("./todo")
mongoose.Promise=global.Promise;

const db = {}
db.mongoose = mongoose
db.toDo = toDo

module.exports = db;