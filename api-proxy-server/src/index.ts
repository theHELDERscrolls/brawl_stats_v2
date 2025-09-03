import { clubsRouter, playersRouter, rankingsRouter } from "./routes/index.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = 3000;

// Limitamos el uso en desarrollo
app.use(cors({ origin: "http://localhost:5173" }));

// IMPORTANTE EN PRODUCCIÓN
// app.use(cors({
//   origin: "https://mi-front.com",
//   methods: ["GET", "POST"], // solo los métodos que uses
//   allowedHeaders: ["Content-Type", "Authorization"], // si necesitas headers personalizados
// }));
app.use(express.json());

app.use("/players", playersRouter);
app.use("/clubs", clubsRouter);
app.use("/rankings", rankingsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Porxy API running at http://localhost:${PORT}`);
});
