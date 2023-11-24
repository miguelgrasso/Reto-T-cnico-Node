"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cardRoute_1 = require("./routes/cardRoute");
const redis_1 = require("./config/redis");
const PORT = process.env.PORT || 3002;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(cardRoute_1.router);
redis_1.clientDb.on('error', (err) => console.log('Error de Redis:', err));
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));
