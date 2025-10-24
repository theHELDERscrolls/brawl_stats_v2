# Hooks

The frontend uses a modular structure for custom React hooks to handle data fetching, state management, and reusable logic across components and pages.  
Hooks are defined either globally under `src/hooks/` or locally inside the `hooks/` folder of each page.

## Global hooks (`src/hooks`)

The `src/hooks/` directory contains reusable hooks that are used in multiple parts of the application.  
These hooks are designed to abstract common behaviors, handle API requests, or provide shared UI logic.

**Examples of global hooks include:**

- `useMediaQuery` — Detects screen width and determines if the current device is mobile or desktop.
- `usePopup` — Manages popup state and behavior.
- `usePlayerInfo`, `useClubInfo`, `useRankingClubs`, `useRankingPlayers`, etc. — Fetch and cache data from the proxy API or Brawl Stars API.
- `useEvents` and `useGameModes` — Retrieve and manage event rotation and game mode information.
- `useBrawlerId` — Maps a brawler’s name or slug to its corresponding ID in the API.

All global hooks follow the same structure:

1. Typed responses using TypeScript interfaces.
2. Internal loading and error states for asynchronous operations.
3. Data fetching handled through the appropriate API client (either official API or custom proxy).

These hooks are imported directly into components or pages that need shared logic or data access.

## Page-specific hooks (`src/pages/**/hooks`)

Each page directory can contain its own `hooks/` subfolder.  
These hooks encapsulate logic specific to that page and are not reused elsewhere in the app.

**Examples:**

- `pages/brawlers/hooks/useBrawlerFilters.ts` — Handles filter state and logic for the brawlers page.
- `pages/maps/hooks/useMaps.ts` and `useMapStats.ts` — Manage map fetching and computed statistics.
- `pages/ranks/hooks/useRankingBrawlers.ts` — Retrieves and sorts brawler ranking data.
- `pages/home/hooks/useTopBrawler.ts` — Gets the “brawler of the day” for the home page.

This separation keeps the project organized:

- Global hooks → shared and reusable logic.
- Local hooks → page-specific behavior and data.

## Conventions

- All hooks are named with the `use` prefix following React’s convention.
- Each hook handles its own internal loading and error state when dealing with asynchronous requests.
- Hooks returning API data must always return typed values (no `any`).
- Shared hooks are exported from `src/hooks/index.ts` for simplified imports.
- Hooks should never include direct UI manipulation — only data and logic.

## Summary

Hooks in Brawl Stats v2 are organized for scalability and clarity.  
Global hooks provide shared data and utilities, while local hooks encapsulate page-specific logic.  
This structure minimizes code duplication, keeps components clean, and promotes reusable, strongly-typed logic throughout the frontend.
