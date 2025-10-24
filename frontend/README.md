# Brawl Stats v2 - Frontend

The **frontend** of _Brawl Stats v2_ is a modern web client built with **React**, **TypeScript**, and **Vite**.  
It provides a fast and dynamic interface for exploring Brawl Stars player, club, and event statistics through the custom backend proxy API.

## Tech stack

- **React 19 + TypeScript** — modern and strongly typed component architecture.
- **Vite 7** — fast development server and optimized build tool.
- **React Router v7** — client-side routing and navigation.
- **React Hook Form + Zod** — form handling and schema validation.
- **Tailwind CSS 4 + @tailwindcss/vite** — utility-first CSS with modern integration.
- **Axios** — HTTP client for API requests (via backend proxy).
- **Recharts** — data visualization and charting library.
- **ESLint + TypeScript ESLint** — linting and code quality enforcement.
- **Rollup Plugin Visualizer** — bundle analysis and optimization insights.

## Project structure

The frontend follows a modular and scalable architecture. Below is an overview of the key directories:

```
frontend/
├── public/              # Static assets (icons, fonts, SVGs)
├── src/
│   ├── api/             # API clients and services for backend and official APIs
│   ├── components/      # Reusable UI components (cards, modals, layouts...)
│   ├── hooks/           # Custom React hooks for data fetching and logic
│   ├── pages/           # Page-level components mapped to routes
│   ├── routes/          # Application routing configuration
│   ├── utils/           # Helper utilities and shared logic
│   ├── index.css        # Global styles
│   ├── main.tsx         # Application entry point
│   └── App.tsx          # Root application component
└── vite.config.ts       # Vite configuration file
```

For a detailed explanation of each module, refer to the [docs/frontend/structure.md](../docs/frontend/structure.md) file.

## Getting started

### 1. Navigate to the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will run by default at [http://localhost:5173](http://localhost:5173)

## Build for production

To create an optimized production build:

```bash
npm run build
```

The output will be generated in the `dist/` directory.

You can preview the production build locally with:

```bash
npm run preview
```

## Linting

Run ESLint to check for code style and formatting issues:

```bash
npm run lint
```

## Contributing

Before contributing, please read the [CONTRIBUTING.md](../CONTRIBUTING.md) file.  
Pull requests are welcome for UI improvements, bug fixes, or new feature ideas.

## License

This project is distributed under the [MIT License](../LICENSE).
