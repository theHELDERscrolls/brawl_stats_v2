import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 60000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    status: 429,
    message: "Too many request. Please, try again later",
  },
});
