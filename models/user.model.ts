import { Schema, model, Document } from "mongoose";
import { Todo, TodoSchema } from "./todo.model.ts";
interface User extends Document {
  username: string;
  email: string;
  password: string;
  emailVerified: boolean;
  todos: Todo[];
}

const UserSchema = new Schema<User>({
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
  todos: [TodoSchema],
});

export default model<User>("User", UserSchema);
