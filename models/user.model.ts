import { Schema, model, Document } from "mongoose";
import { Todo, TodoModel } from "./todo.model.ts";
interface User extends Document {
  username: string;
  email: string;
  password: string;
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
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

export default model<User>("User", UserSchema);
