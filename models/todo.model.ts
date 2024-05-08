import { Schema, model, Document } from "mongoose";
export interface Todo extends Document {
  title: string;
  description: string;
  completed: boolean;
  priority: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<Todo>({
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

export const TodoModel = model<Todo>("Todo", TodoSchema);
