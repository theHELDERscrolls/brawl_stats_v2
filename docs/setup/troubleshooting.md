# Troubleshooting Guide

This document lists common setup and runtime issues that may occur when running **Brawl Stats v2**, along with their possible causes and solutions.

## 1. API Key not found

**Error message:**

```bash
⚠️ API_KEY doesn't found
```

**Cause:**  
The `BS_API_KEY` environment variable is missing or not loaded.

**Fix:**

1. Create a `.env` file inside `/api-proxy-server/`.
2. Add your Brawl Stars developer token:

   `BS_API_KEY=your_token_here`

3. Restart the backend:

   `npm run dev`

> 💡 Remember: You must request your API key at [developer.brawlstars.com](https://developer.brawlstars.com/).  
> During registration, specify your **public IP address** (printed in the console when running the proxy server).

## 2. CORS not allowed by server

**Error message:**

```bash
Error: CORS not allowed by server
```

**Cause:**  
The frontend’s origin (e.g. `http://localhost:5173` or your deployed Vercel URL) is not included in `ALLOWED_ORIGINS`.

**Fix:**

1. In `/api-proxy-server/.env`, define allowed origins:

```env
ALLOWED_ORIGINS=http://localhost:5173,https://your-vercel-app.vercel.app
```

2. Restart the backend server.

## 3. HTTP 429: Too Many Requests

**Error message:**

```yaml
HTTP 429: Too Many Requests
```

**Cause:**  
The rate limiter blocked requests because the limit was exceeded.

**Fix:**

- Wait for the cooldown period (typically 1 minute).
- Avoid spamming multiple requests (e.g. reloading the page repeatedly).
- During development, you can temporarily adjust the rate-limit configuration in  
   `/api-proxy-server/src/middlewares/rate-limit.ts`.

## 4. Frontend not connecting to backend

**Error message (browser console):**

```bash
GET http://localhost:3000/players/:tag net::ERR_CONNECTION_REFUSED
```

**Cause:**  
The backend is not running or the `VITE_API_BASE_URL` variable is incorrect.

**Fix:**

1. Ensure the backend is running:

```bash
cd api-proxy-server
npm run dev
```

2. In `/frontend/.env`, check that:

```env
VITE_API_BASE_URL=http://localhost:3000
```

3. Restart the frontend:

```bash
npm run dev
```

## 5. Deployment environment mismatch (Render ↔ Vercel)

**Problem:**  
Frontend or backend URLs are hardcoded or misconfigured after deployment.

**Fix:**

- Make sure environment variables are consistent across both platforms:

| Platform          | Variable            | Example                                    |
| ----------------- | ------------------- | ------------------------------------------ |
| Render (backend)  | `ALLOWED_ORIGINS`   | `https://your-vercel-app.vercel.app`       |
| Vercel (frontend) | `VITE_API_BASE_URL` | `https://your-render-service.onrender.com` |

- Redeploy both apps after changes.

## 6. JSON parsing or undefined data in frontend

**Symptom:**  
Empty or “undefined” UI values when loading player or club data.

**Cause:**  
The API response shape may differ or the tag input is invalid.

**Fix:**

- Ensure tags start with `#` (e.g. `#ABCD123`).
- Validate player or club existence directly in the [official API docs](https://developer.brawlstars.com/#/documentation).

## Quick checklist

✅ `.env` files exist in both `/api-proxy-server` and `/frontend`.
✅ Backend is running before frontend.
✅ CORS configured correctly.
✅ Public IP added to Brawl Stars developer portal.
✅ Rate limit not exceeded.
✅ Environment URLs match across Render and Vercel.
