"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const resend_1 = require("resend");
const auth_ez_1 = require("auth-ez");
const user_model_1 = __importDefault(require("./models/user.model"));
const constants_1 = require("./utils/constants");
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const port = process.env.PORT;
const dbUrl = process.env.OPEN_TODO_DB_URL;
mongoose_1.default.connect(dbUrl);
const authEzConfig = {
    User: user_model_1.default,
    enableLogs: true,
    emailOptions: {
        enableEmail: true,
        emailType: constants_1.RESEND,
        emailSdk: resend,
        verificationMailSubject: constants_1.EMAIL_SUBJECT,
    },
};
const authController = new auth_ez_1.CreateMongoAuthController(authEzConfig);
app.use("/api/v1", authController.getRouter());
app.get("/", (_, res) => res.json({ status: 200, message: "open-todo service" }));
app.use("/api/v1", authController.getRouter());
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
app.listen(port, () => console.log(`Server is running on ${port}`));
