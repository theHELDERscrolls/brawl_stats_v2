# Environment Configuration

## Overview

This document explains how to configure environment variables required for running the **Brawl Stats Proxy Server** and **Frontend** locally or in deployment environments (Render / Vercel).  
Environment variables are used to manage API authentication, allowed origins (CORS), and base URLs for communication between the backend and frontend.

## 1. API Proxy Server

### Location

Environment variables for the backend must be defined in a `.env` file located at the root of the **`api-proxy-server/`** directory.

Example path:

```bash
api-proxy-server/.env
```

### Required Variables

| Variable          | Required    | Description                                                                                                                                                              |
| ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `BS_API_KEY`      | ✅ Yes      | **Official Brawl Stars API key** obtained from [developer.brawlstars.com](https://developer.brawlstars.com/#/). Used by the `brawlApi` service to authenticate requests. |
| `PORT`            | ❌ Optional | Port number where the proxy server runs (default: `3000`).                                                                                                               |
| `ALLOWED_ORIGINS` | ❌ Optional | Comma-separated list of origins allowed by CORS (default: `http://localhost:5173`).                                                                                      |

### Example `.env`

```bash
BS_API_KEY=eyJhbGciOiJIUzI1NiIsInR...
PORT=3000
ALLOWED_ORIGINS=http://localhost:5173,https://brawlstats.vercel.app
```

### Getting Your Brawl Stars API Key

To connect the proxy server with the official Brawl Stars API, you must register and generate an API key from the [Brawl Stars Developer Portal](https://developer.brawlstars.com/#/).

#### Steps

1. **Go to:** [https://developer.brawlstars.com/#/](https://developer.brawlstars.com/#/)
2. **Log in or create an account.**
3. **Generate a new API key**, specifying:

   - **Name:** e.g., `Local Brawl Stats Proxy`
   - **IP Address:** your **public IP address**

4. Copy the generated token and set it as your `BS_API_KEY` in `.env`.

#### Finding Your Public IP

When you start the proxy server locally, it automatically logs your public IP in the console, thanks to this section in `api-proxy-server/src/index.ts`:

```ts
const res = await axios.get("https://api.ipify.org?format=json");
console.log("🌍 Public IP of this Render instance:", res.data.ip);
```

You can copy that IP address and use it in the Brawl Stars Developer Portal when creating or updating your API key.

## 2. Frontend Application

### Location

Environment variables for the frontend must be defined in a `.env` file located at the root of the **`frontend/`** directory.

Example path:

```bash
frontend/.env
```

### Required Variables

| Variable            | Required    | Description                                                                                                                                            |
| ------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `VITE_API_BASE_URL` | ❌ Optional | Base URL for the proxy server (used by Axios in `frontend/src/api/official-api/client/brawlstars-api-client.ts`). Defaults to `http://localhost:3000`. |

### Example `.env`

```bash
VITE_API_BASE_URL=http://localhost:3000
```

This variable allows the frontend to communicate with either:

- The **local backend** during development (`http://localhost:3000`), or
- The **deployed proxy server** on Render (`https://brawlstats-api.onrender.com`).

## 3. Deployment Environment Variables

When deploying to **Render (backend)** and **Vercel (frontend)**, environment variables must be configured in their respective dashboards:

### Render (Proxy Server)

| Variable          | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `BS_API_KEY`      | The official Brawl Stars API key.                                           |
| `ALLOWED_ORIGINS` | Include the frontend deployment URL (e.g. `https://brawlstats.vercel.app`). |
| `PORT`            | Automatically handled by Render, no need to define manually.                |

### Vercel (Frontend)

| Variable            | Description                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | URL of your deployed proxy server on Render (e.g. `https://brawlstats-api.onrender.com`). |

## 4. Summary

| Environment         | Variable            | Description                                        |
| ------------------- | ------------------- | -------------------------------------------------- |
| **Backend (.env)**  | `BS_API_KEY`        | Required to authenticate with the Brawl Stars API. |
|                     | `PORT`              | Optional, defaults to `3000`.                      |
|                     | `ALLOWED_ORIGINS`   | Optional, defines allowed frontend URLs.           |
| **Frontend (.env)** | `VITE_API_BASE_URL` | URL of the proxy server (defaults to localhost).   |

## 5. Notes

- Only **`BS_API_KEY`** is required for local development.  
   All other variables are optional and mainly used for deployment configuration.
- You can test the full stack locally with:

```bash
# Start backend
cd api-proxy-server && npm run dev

# Start frontend
cd frontend && npm run dev
```

- Ensure the backend is running before the frontend attempts to make requests.
- If the `BS_API_KEY` is missing or invalid, the proxy server will **throw an error at startup** and refuse to run.
