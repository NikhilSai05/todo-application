var express = require("express");
var router = express.Router();
var db = require("../models/index");
const toDo = require("../models/todo");

router.get("/", function (req, res) {
  db.toDo
    .find()
    .then(function (todo) {
      res.json(todo);
      console.log(todo);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.put("/:todoId", function (req, res) {
  db.toDo
    .findOneAndUpdate(req.params.todoId, req.body)
    .then(function (todo) {
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(todo);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/", function (req, res) {
  const task = req.body.name;
  if (!task) {
    return res.status(400).json({ error: "Missing task name" });
  }
  toDo.create(req.body, function (err, newtodo) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error saving to database" });
    }
    console.log(newtodo, "Data saved");
    res.status(201).json(newtodo);
  });
});

router.get("/:todoId", function (req, res) {
  db.toDo
    .findById(req.params.todoId)
    .then(function (foundtodo) {
      if (!foundtodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(foundtodo);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.delete("/:todoId", function (req, res) {
  db.toDo
    .findByIdAndRemove(req.params.todoId)
    .then(function (deletedTodo) {
      if (!deletedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json({ message: "TASK DELETED" });
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
