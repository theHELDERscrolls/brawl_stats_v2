import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://api.brawlstars.com/v1";
const API_KEY = process.env.BS_API_KEY;

if (!API_KEY) {
  throw new Error("⚠️ API_KEY doesn't found");
}

export const brawlApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});
