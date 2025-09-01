import { clubsRouter, playersRouter, rankingsRouter } from "./routes/index.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/players", playersRouter);
app.use("/clubs", clubsRouter);
app.use("/rankings", rankingsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Porxy API running at http://localhost:${PORT}`);
});
