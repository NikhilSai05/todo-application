const express = require("express");
const router = express.Router();
const db = require("../models/index");
const ToDo = require("../models/todo");

router.get("/", async (req, res) => {
  try {
    const todos = await ToDo.find();
    res.json(todos);
    console.log(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:todoId", async (req, res) => {
  try {
    const todo = await ToDo.findByIdAndUpdate(req.params.todoId, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Missing task name" });
    }
    const newTodo = await ToDo.create(req.body);
    console.log(newTodo, "Data saved");
    res.status(201).json(newTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error saving to database" });
  }
});

router.get("/:todoId", async (req, res) => {
  try {
    const foundTodo = await ToDo.findById(req.params.todoId);
    if (!foundTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(foundTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:todoId", async (req, res) => {
  try {
    const deletedTodo = await ToDo.findByIdAndRemove(req.params.todoId);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "TASK DELETED" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;