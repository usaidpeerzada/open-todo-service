import express from "express";
import User from "../models/user.model";
import { TodoModel } from "../models/todo.model";

const router = express.Router();

router.get("/", (_, res) => res.json({ status: 400, message: "unauthorized" }));

router.get("/get-todos", async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.json(user.todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/todo/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const todo = user.todos.find((todo) => todo._id == req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/create-todo", async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, description, priority, tags } = req.body;
    const newTodo = {
      title,
      description,
      priority,
      tags,
    };
    const savedTodo = await TodoModel.create(newTodo);
    await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { todos: savedTodo } },
      { new: true }
    );
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update-todo/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, description, priority, tags, completed } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: userId, "todos._id": req.params.id },
      {
        $set: {
          "todos.$.title": title,
          "todos.$.description": description,
          "todos.$.priority": priority,
          "todos.$.tags": tags,
          "todos.$.completed": completed,
          "todos.$.updatedAt": Date.now(),
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(user.todos.find((todo) => todo._id == req.params.id));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/todo/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { todos: { _id: req.params.id } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
