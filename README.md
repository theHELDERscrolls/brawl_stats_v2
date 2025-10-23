# Brawl Stats v2

**Brawl Stats v2** is a full-stack web application developed as part of the **Master’s Degree in Full-Stack Web Development**.  
The project’s goal was to **consume a public API** — in this case, the official **Brawl Stars API** — and build a complete web platform that displays detailed player and club statistics.

The application consists of a **custom Node.js proxy API** and a **React + Vite frontend**, designed to provide a smooth and modern user experience while handling all API communication securely on the backend.

---

## Project structure

```yaml
.
├── frontend/            # React + Vite + TypeScript app
├── api-proxy-server/    # Node + Express + TypeScript proxy
├── docs/                # Setup, environment, and API docs
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── LICENSE
```

---

## Quick start

### Prerequisites

- Node.js **v18+**
- A valid [Brawl Stars API key](https://developer.brawlstars.com/)
- See [docs/setup/environment.md](./docs/setup/environment.md) for detailed setup and token configuration.

### Clone the repositories

Clone the main project (includes both frontend and backend):

```bash
git clone https://github.com/your-username/brawl-stats-v2.git
cd brawl-stats-v2
```

### Install dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../api-proxy-server
npm install
```

### Environment setup

Create the required `.env` files in each directory:

**api-proxy-server/.env**

```env
BS_API_KEY=your_brawl_stars_token
PORT=3000
```

> 🔑 For full instructions on obtaining your Brawl Stars token, check [docs/setup/environment.md](./docs/setup/environment.md).

### Run locally

#### Start backend

```bash
cd api-proxy-server
npm run dev
```

Runs at: [http://localhost:3000/api](http://localhost:3000/api)

#### Start frontend

```bash
cd ../frontend
npm run dev
```

Runs at: [http://localhost:5173](http://localhost:5173)

---

## Environment variables

| Module             | Variable     | Description                      |
| ------------------ | ------------ | -------------------------------- |
| `api-proxy-server` | `BS_API_KEY` | Your Brawl Stars developer token |

> For more setup details, see [docs/setup/environment.md](./docs/setup/environment.md).

---

## Contributing

We welcome pull requests and issue reports!  
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and follow the commit conventions.

---

## Code of Conduct

This project follows the [Code of Conduct](./CODE_OF_CONDUCT.md).  
By contributing, you agree to uphold these guidelines.

---

## License

Distributed under the MIT License.  
See [LICENSE](./LICENSE) for more information.

---

## Support

If you encounter issues, open an issue with the label `question` or `bug`.  
For private matters, contact:  
📧 **manuhelderruiz@gmail.com**  
💬 **Discord:** heldersito
