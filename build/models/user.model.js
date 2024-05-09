"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todo_model_1 = require("./todo.model");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailVerified: { type: Boolean, default: false },
    todos: [todo_model_1.TodoSchema],
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
