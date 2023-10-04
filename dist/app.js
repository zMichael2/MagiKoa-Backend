"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const contentRegister_router_1 = __importDefault(require("./routes/contentRegister.router"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
(0, database_1.connectDatabase)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(contentRegister_router_1.default);
app.get("/", (req, res) => {
    res.status(200).json({ message: "Magi-Koa Api  " });
});
app.listen(PORT, () => {
    console.log("Initialized Server!!!");
});
