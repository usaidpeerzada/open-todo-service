"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes.js
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../models/user.model"));
const todo_model_1 = require("../models/todo.model");
const router = express_1.default.Router();
router.get("/", (_, res) => res.json({ status: 400, message: "unauthorized" }));
router.get("/get-todos", async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await user_model_1.default.findById(userId);
        res.json(user.todos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/todo/:id", async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await user_model_1.default.findById(userId);
        const todo = user.todos.find((todo) => todo._id == req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json(todo);
    }
    catch (error) {
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
        const savedTodo = await todo_model_1.TodoModel.create(newTodo);
        await user_model_1.default.findByIdAndUpdate({ _id: userId }, { $push: { todos: savedTodo } }, { new: true });
        res.status(201).json(savedTodo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.put("/update-todo/:id", async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, description, priority, tags, completed } = req.body;
        const user = await user_model_1.default.findOneAndUpdate({ _id: userId, "todos._id": req.params.id }, {
            $set: {
                "todos.$.title": title,
                "todos.$.description": description,
                "todos.$.priority": priority,
                "todos.$.tags": tags,
                "todos.$.completed": completed,
                "todos.$.updatedAt": Date.now(),
            },
        }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json(user.todos.find((todo) => todo._id == req.params.id));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.delete("/todo/:id", async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await user_model_1.default.findByIdAndUpdate(userId, { $pull: { todos: { _id: req.params.id } } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Todo deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
