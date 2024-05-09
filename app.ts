import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Resend } from "resend";
import { CreateMongoAuthController } from "auth-ez";

import User from "./models/user.model";
import { Config } from "./utils/types";
import { EMAIL_SUBJECT, RESEND } from "./utils/constants";

import routes from "./routes/routes";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const port = process.env.PORT;
const dbUrl = process.env.OPEN_TODO_DB_URL;
mongoose.connect(dbUrl);

const authEzConfig: Config = {
  User,
  enableLogs: true,
  emailOptions: {
    enableEmail: true,
    emailType: RESEND,
    emailSdk: resend,
    verificationMailSubject: EMAIL_SUBJECT,
  },
};

const authController = new CreateMongoAuthController(authEzConfig);

app.use("/api/v1", authController.getRouter());

app.get("/", (_, res) =>
  res.json({ status: 200, message: "open-todo service" })
);

app.use("/api/v1", authController.getRouter());
app.use(express.json());
app.use("/api/v1", routes);

app.listen(port, () => console.log(`Server is running on ${port}`));
