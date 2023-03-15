var express = require("express");
var router = express.Router();
var db = require("../models/index");
const toDo = require("../models/todo")
router.get("/",function(req,res){
    db.toDo.find()
      .then(function(todo){
        res.json(todo);
      })
      .then(function(todos){
          console.log(todos);
      })
      .catch(function(err){
          console.log(err);
      });   
});
router.put("/:todoId",function(req,res){
    db.toDo.findByIdAndUpdate(req.params.todoId,req.body)
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        console.log(err);
    })
})
router.post("/",function(req,res){
    const task=req.body.name;
    console.log("Task  :",task)
    console.log(req.body)
    console.log("Code reached post :",req.body)
    //Todo.create(req.body)
    const todo = new toDo(req.body)
    todo.save((err, data) => {
        if(err) {
            console.log("Error saving in mongo db");
            return;
        }
        console.log(data, "Data saved")

    })
    // .then(function(newtodo){
    //     console.log("Nww todo :",newtodo)
    //     res.status(201).json(newtodo);
    // })
    // .catch(function(err){
    //     console.log(err);
    // })
})
router.get("/:todoId",function(req,res){
    db.toDo.findById(req.params.todoId)
    .then(function(foundtodo){
        res.json(foundtodo);
    })
    .catch(function(err){
        console.log(err);
    })
})
router.delete("/:todoId",function(req,res){
    db.toDo.findByIdAndRemove(req.params.todoId)
    .then(function(){
        res.json({message:"We deleted it"});
    })
    .catch(function(err){
        console.log(err);
    })
});
module.exports=router;