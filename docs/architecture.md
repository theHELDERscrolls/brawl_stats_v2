# Project Architecture

## Overview

This project consists of two main parts:

- **`api-proxy-server/`** — A backend service built with Node.js and Express that acts as a secure proxy to the **official Brawl Stars API**. It manages rate limiting, request validation, and unified error handling before forwarding responses to the frontend.
- **`frontend/`** — A React + TypeScript application that serves as the user interface. It consumes two APIs:
  - The **official Brawl Stars API**, accessed indirectly through the backend proxy for security and consistency.
  - The **BrawlAPI** (a public third-party API), accessed directly from the frontend since it does not require authentication.

The overall design follows a **client–server architecture**, where the frontend communicates with both a secured backend proxy and a public API.

```css
[Frontend (React)]  →  [Proxy API Server]  →  [Official Brawl Stars API]
       ↓
   [BrawlAPI (public)]
```

## API Proxy Server

**Path:** `api-proxy-server/`

### Purpose

The proxy server provides a secure and consistent interface between the frontend and the official Brawl Stars API.  
It prevents exposure of sensitive credentials, standardizes data, and protects the application from excessive request rates or malformed data.

### Key Responsibilities

- Manage and secure the official Brawl Stars API key.
- Normalize responses for the frontend.
- Apply rate-limiting to prevent abuse.
- Handle and format API errors consistently.
- Validate responses using Zod schemas and TypeScript types.

### Technologies

- **Node.js** — Runtime environment.
- **Express** — Web framework for routing and middleware.
- **Axios** — For HTTP requests to the official Brawl Stars API.
- **Zod** — Schema validation and type-safe parsing.
- **dotenv** — Environment variable management.
- **express-rate-limit** — Rate limiting middleware.
- **TypeScript** — Type-safe backend development.

### Structure

```bash
api-proxy-server/
├── src/
│   ├── controllers/        # Controllers for each resource (players, clubs, rankings)
│   ├── middlewares/        # Shared middleware (rate limiting, error handling)
│   ├── routes/             # Express routers defining endpoints
│   ├── services/           # Service layer for API communication
│   ├── types/              # TypeScript definitions and Zod schemas
│   └── index.ts            # Server entry point

```

### Request Flow

1. The **frontend** sends a request to the proxy server.
2. The **router** identifies the corresponding controller.
3. The **controller** calls a **service** that interacts with the official Brawl Stars API via Axios.
4. The **response** is validated and normalized.
5. Any error is caught and transformed into a standard response format.
6. The **validated data** is returned to the frontend.

Example:

```bash
GET /players/:tag
   → players.route.ts
      → player.controller.ts
         → brawlstars.api.ts (service)
```

## Frontend

**Path:** `frontend/`

### Purpose

The frontend is a React + TypeScript single-page application (SPA) that provides the user interface for viewing player statistics, club information, rankings, maps, and other data related to Brawl Stars.

It interacts with two APIs:

- **Backend Proxy (`api-proxy-server`)** — for secure access to the official Brawl Stars API.
- **BrawlAPI** — a public API used directly from the client for additional game data such as maps, events, and assets.

### Technologies

- **React 19** — UI framework for building interactive components.
- **TypeScript** — Type-safe development for scalability.
- **Vite** — Build tool and development server.
- **React Router v7** — Client-side routing and navigation.
- **Axios** — HTTP client for API calls.
- **React Hook Form** — Form management and validation.
- **Zod** — Schema validation integrated with React Hook Form.
- **Tailwind CSS** — Utility-first CSS framework.
- **Recharts** — Data visualization and charting.
- **ESLint + TypeScript ESLint** — Static analysis and linting.

### Structure

```bash
frontend/
├── src/
│   ├── api/               # API clients (official-proxy and BrawlAPI)
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom hooks for data fetching and logic
│   ├── pages/             # Page-level components (Home, Players, Clubs, etc.)
│   ├── routes/            # React Router configuration
│   ├── utils/             # Helper and transformation utilities
│   ├── App.tsx            # Root application component
│   └── main.tsx           # Entry point
```

### API Communication

The frontend distinguishes between two data sources:

| Source                       | Access Method                              | Description                                           |
| ---------------------------- | ------------------------------------------ | ----------------------------------------------------- |
| **Official Brawl Stars API** | Through backend proxy (`api-proxy-server`) | Protected API that requires authentication via token. |
| **BrawlAPI**                 | Direct HTTP requests from frontend         | Public API with no authentication required.           |

Example calls:

- To proxy (secured):

```bash
GET http://localhost:3000/players/%TAG%
GET http://localhost:3000/clubs/%TAG%
```

- To BrawlAPI (direct):

```bash
GET https://api.brawlapi.com/v1/maps
GET https://api.brawlapi.com/v1/events
```

## Data Flow

1. A component triggers a data fetch through a **custom hook**.
2. The hook calls a **service** defined in `src/api/`.
3. The service determines which API to call:

   - Proxy API for official Brawl Stars data.
   - Public BrawlAPI for auxiliary data.

4. The response is validated (using Zod) and passed back to the component.
5. The UI updates accordingly with the fetched data.

## Communication Between Frontend and Backend

Only requests to the **official Brawl Stars API** are routed through the backend proxy.  
This ensures that:

- The API key remains secure.
- The frontend stays independent of authentication management.
- Requests are rate-limited and validated before reaching the official API.

The public **BrawlAPI** remains directly accessible from the client, as it requires no authentication and offers high availability.

## Build and Deployment

Both projects are independent Node.js applications with separate `package.json` files.

Deployment steps typically include:

1. **Backend**

   - Build TypeScript (`npm run build`).
   - Run the compiled server with Node.js.
   - Configure environment variables (`.env`) for API keys and ports.

2. **Frontend**

   - Build the SPA using Vite (`npm run build`).
   - Serve the static files on a hosting provider (Vercel, Netlify, or any web server).
   - Configure environment variables to set API URLs (proxy and BrawlAPI).

## Design Principles

- **Separation of Concerns:** The backend handles authentication, rate limiting, and validation; the frontend focuses on presentation and state management.
- **Modularity:** Each feature is encapsulated within its own directory for scalability and maintenance.
- **Type Safety:** Shared types and Zod schemas ensure consistent data validation across layers.
- **Security:** API keys are stored and used only on the backend.
- **Performance:** Vite and Axios ensure fast builds and efficient data fetching.
- **Extensibility:** New endpoints and UI modules can be added with minimal impact on the existing structure.
