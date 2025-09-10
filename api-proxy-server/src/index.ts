import { clubsRouter, playersRouter, rankingsRouter } from "./routes/index.js";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET"],
  })
);
app.use(express.json());

// 👉 Al iniciar, logueamos la IP pública
async function logPublicIP() {
  try {
    const res = await axios.get("https://api.ipify.org?format=json");
    console.log("🌍 Public IP of this server:", res.data.ip);
  } catch (err) {
    console.error("❌ Could not fetch public IP:", err);
  }
}

logPublicIP();

app.use("/players", playersRouter);
app.use("/clubs", clubsRouter);
app.use("/rankings", rankingsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Porxy API running at http://localhost:${PORT}`);
});
