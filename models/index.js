var mongoose = require("mongoose");
mongoose.set('debug',true);
mongoose.connect("mongodb://localhost/todo_api",{useNewUrlParser: true,useUnifiedTopology:true}, () => { console.log("we are connected")}).catch(err => console.log(err));
mongoose.Promise=Promise;
module.exports.Todo=require("./todo");