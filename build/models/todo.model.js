"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = exports.TodoSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TodoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: Number,
        min: 1,
        max: 5,
        default: 3,
    },
    tags: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
exports.TodoModel = (0, mongoose_1.model)("Todo", exports.TodoSchema);
