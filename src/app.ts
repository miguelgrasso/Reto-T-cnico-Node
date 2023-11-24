import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes/cardRoute";
import { clientDb } from "./config/redis";

const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
clientDb.on('error', (err) => console.log('Error de Redis:', err));
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));