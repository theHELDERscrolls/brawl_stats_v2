# Brawl Stats v2 - API Proxy Server

The **API Proxy Server** of _Brawl Stats v2_ is a lightweight backend service built with **Express** and **TypeScript**.  
It acts as a secure intermediary between the **frontend client** and the **official Brawl Stars API**, handling rate limiting, request validation, and data shaping before returning optimized responses to the frontend.

---

## Tech stack

- **Express 5 + TypeScript** — fast and type-safe backend framework.
- **Axios** — HTTP client for communication with the Brawl Stars API.
- **Zod** — runtime schema validation and type inference for request/response data.
- **dotenv** — environment variable management.
- **CORS** — cross-origin resource sharing middleware.
- **express-rate-limit** — API rate limiting and abuse prevention.
- **Node.js (ES Modules)** — modern JavaScript runtime environment.

---

## Project structure

The backend follows a clean and modular architecture, designed for scalability and clarity.  
Below is an overview of the key directories:

```bash
api-proxy-server/
├── src/
│   ├── controllers/      # Request controllers for each resource (players, clubs, rankings)
│   ├── middlewares/      # Custom middlewares (rate limiting, etc.)
│   ├── routes/           # Route definitions and API endpoints
│   ├── services/         # External API clients and business logic
│   ├── types/            # Shared and domain-specific TypeScript types
│   └── index.ts          # Server entry point
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

For detailed explanations of each module, see the [docs/api](../docs/api) directory:

- [controllers.md](../docs/api/controllers.md)
- [endpoints.md](../docs/api/endpoints.md)
- [rate-limiting.md](../docs/api/rate-limiting.md)
- [types.md](../docs/api/types.md)

---

## Getting started

### 1. Navigate to the proxy server directory

```bash
cd api-proxy-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root with your Brawl Stars API key:

```ini
BRAWL_API_KEY=your_api_key_here
PORT=3000
```

You can find more details in [docs/setup/environment.md](../docs/setup/environment.md).

### 4. Start the development server

```bash
npm run dev
```

The proxy will start by default at [http://localhost:3000](http://localhost:3000)

---

## Build for production

To compile TypeScript and run the server in production mode:

```bash
npm run build
npm start
```

The compiled output will be located in the `dist/` directory.

---

## Rate limiting

The API Proxy includes built-in rate limiting to prevent excessive requests and protect the upstream Brawl Stars API.  
Configuration details are available in [docs/api/rate-limiting.md](../docs/api/rate-limiting.md).

---

## Linting & code quality

This project uses TypeScript’s strict mode for static type checking and consistent code quality.  
You can also integrate ESLint if desired for additional linting and formatting rules.

---

## Contributing

Before contributing, please read the [CONTRIBUTING.md](../CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) files.  
Pull requests are welcome for performance improvements, new routes, or refactoring suggestions.

---

## License

This project is distributed under the [MIT License](../LICENSE).
