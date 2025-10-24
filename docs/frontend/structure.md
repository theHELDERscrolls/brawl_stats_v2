# Frontend Structure

This document describes the structure and organization of the frontend codebase for **Brawl Stats v2**.  
The frontend is built with **React**, **TypeScript**, and **Vite**, following a modular and scalable architecture that separates logic, UI components, hooks, and utilities.

## Overview

The project’s source code is located in the `frontend/src` directory.  
The structure is organized to promote clarity, reusability, and maintainability.  
Each feature or page has its own folder, and shared logic or components are centralized in common directories.

```css
src/
├── api/
├── components/
├── hooks/
├── pages/
├── routes/
├── utils/
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts
```

## Public assets

The `public/` directory contains static assets available globally:

- `brawl_stats.svg` and `spriteSheets.svg` store the main icons and vector resources.
- The `fonts/` folder includes the Lilita One typeface used across the UI.

These assets are referenced by the application at runtime and are not processed by Vite.

## API Layer

The `src/api/` directory contains all logic for communicating with APIs.  
It is divided into two main namespaces:

- `brawl-stars-api/`: for static data such as maps, brawlers, events, and game modes fetched directly from the official Brawl Stars API.
- `official-api/`: for proxy-based data retrieved through the custom backend (players, clubs, and rankings).

Each namespace contains:

- `client/`: Axios configuration and interceptors.
- `services/`: functions that encapsulate API requests.
- `types/`: TypeScript interfaces and models defining the shape of the responses.

This structure ensures a clear separation between data fetching logic and UI rendering.

## Components

The `src/components/` folder contains all UI components, grouped by functionality:

- `common/`: reusable UI elements such as buttons, headers, modals, and loaders.
- `layout/`: defines global layouts for the application, including two versions of the dashboard:
  - `DesktopLayout` and `MobileLayout` for responsive rendering.
  - Partial components like `NavHeader` and `NavFooter`.
- Page-specific folders (`home/`, `brawlers/`, `maps/`, `ranks/`, `modals/`) contain components that belong exclusively to those sections.
- Each subfolder uses an `index.ts` file to export its components, making imports cleaner.

This modular approach allows UI parts to be reused and extended easily.

## Hooks

The `src/hooks/` directory contains reusable React hooks that are shared across multiple parts of the application.  
Examples include `useMediaQuery`, `usePopup`, and `useRankingPlayers`.

Additionally, each page (such as `home`, `maps`, or `brawlers`) has its own `hooks/` subdirectory that stores logic specific to that page.  
This prevents coupling and keeps page-level logic self-contained while allowing global hooks to remain centralized.

## Pages

The `src/pages/` directory defines the main views of the application.  
Each page represents a route in the app and is organized by feature:

- `home/`
- `brawlers/`
- `maps/`
- `ranks/`
- `info/`
- `NotFound.tsx`

Each page folder may include:

- A main component (e.g., `Home.tsx`)
- Sub-hooks (`hooks/`)
- Schemas or validation logic (e.g., `tagSchemas.ts`)
- Related UI components specific to that page

This structure promotes separation of concerns between global UI and feature-specific logic.

## Routing

The `src/routes/` directory manages the navigation flow of the application:

- `AppRouter.tsx`: main router defining all routes.
- `RoutesWithNotFound.tsx`: wrapper that ensures non-existent paths render the `NotFound` page.
- `index.ts`: centralized exports for cleaner imports.

The routing system ensures consistent navigation between main sections while handling 404 errors gracefully.

## Utilities

The `src/utils/` directory contains helper functions that provide reusable logic throughout the app.  
These are grouped by purpose:

- `battlelog.ts`: helpers for parsing and formatting battle logs.
- `brawlers.ts`, `maps.ts`: utility functions for filtering and transforming game data.
- `preloadImages.ts`: preloads assets for performance optimization.
- `styles.ts`: reusable constants or computed style helpers.

This modular organization allows each domain to have its own independent set of utilities.

## Entry points

- `main.tsx` initializes the React application and mounts it to the DOM.
- `App.tsx` defines the top-level component that wraps routes and layout providers.
- `index.css` sets global styles and imports fonts and Tailwind configurations.

## Summary

The frontend architecture follows a feature-based modular design:

- **Shared logic** lives in `hooks/` and `utils/`.
- **Page-specific code** stays inside each `pages/` directory.
- **Reusable UI components** are organized under `components/`.
- **API communication** is centralized under `api/`.

This layout provides a scalable foundation that simplifies maintenance and collaboration while keeping the codebase consistent and predictable.
