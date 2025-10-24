# Brawl Stats v2 – Documentation

This directory contains the full technical documentation for **Brawl Stats v2**, covering the setup, environment configuration, architecture, API proxy, and frontend structure.

Each section is organized to guide both contributors and maintainers through the project’s structure and logic.

## Table of Contents

### Setup & Environment

Guides to install, configure, and troubleshoot the project locally or in deployment environments.

- [Installation](./setup/installation.md)
- [Environment Variables](./setup/environment.md)
- [Troubleshooting](./setup/troubleshooting.md)

### Architecture

An overview of how the backend and frontend interact, and how responsibilities are divided.

- [Project Architecture](./architecture.md)

### API Proxy Server

Technical documentation for the Node + Express API that serves as a proxy to the official Brawl Stars API.

- [Controllers](./api/controllers.md)
- [Endpoints](./api/endpoints.md)
- [Services](./api/services.md)
- [Types](./api/types.md)
- [Rate Limiting](./api/rate-limiting.md)

### Frontend

Documentation for the React + Vite application, including its structure, routing, hooks, and styling conventions.

- [Structure](./frontend/structure.md)
- [Routing](./frontend/routing.md)
- [Components](./frontend/components.md)
- [Hooks](./frontend/hooks.md)
- [Styling](./frontend/styling.md)

## Contribution

If you are contributing or maintaining the project, make sure to read:

- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md)

## License

This project is distributed under the [MIT License](../LICENSE).
