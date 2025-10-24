import { clubsRouter, playersRouter, rankingsRouter } from "./routes/index.js";
import { rateLimiter } from "./middlewares/rate-limit.js";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed by server"));
    },
    methods: ["GET"],
  })
);

app.use(rateLimiter);

app.use(express.json());

app.use("/players", playersRouter);
app.use("/clubs", clubsRouter);
app.use("/rankings", rankingsRouter);

app.listen(PORT, async () => {
  console.log(`🚀 Proxy API running at http://localhost:${PORT}`);

  try {
    const res = await axios.get("https://api.ipify.org?format=json");
    console.log("🌍 Public IP of this Render instance:", res.data.ip);
  } catch (err) {
    console.error("❌ Could not fetch public IP:", err);
  }
});
