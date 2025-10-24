# Routing

The routing system in **Brawl Stats v2** is built using **React Router v7**, providing a clear and responsive navigation flow across desktop and mobile layouts.  
It defines all the main application routes and ensures that non-existent paths redirect to a custom 404 page.

## Overview

All routing logic is located in the `src/routes/` directory.  
The two main files are:

- `AppRouter.tsx` – defines the main route structure and layouts.
- `RoutesWithNotFound.tsx` – adds 404 handling logic for undefined routes.

Additionally, `App.tsx` loads the router as the root component of the frontend.

## AppRouter

The `AppRouter` component initializes React Router through the `BrowserRouter` provider and wraps the route configuration with a `ModalProvider` and a `Suspense` boundary for lazy loading.

Each page of the application is loaded lazily to optimize bundle size and performance.  
The component also determines whether to render the **desktop** or **mobile** layout based on the screen width using the custom hook `useMediaQuery`.

**Key points:**

- Routes are nested inside either `DesktopLayout` or `MobileLayout` depending on the viewport.
- `Suspense` handles the fallback UI with a centered `Loader` component.
- Lazy loading improves performance by splitting each page into its own bundle.

**Defined routes:**

| Path           | Component     | Description                                      |
| -------------- | ------------- | ------------------------------------------------ |
| `/` or `/home` | `Home`        | Main landing page                                |
| `/brawlers`    | `BrawlerPage` | Displays all brawlers and filtering tools        |
| `/ranks`       | `Ranks`       | Global rankings for players, clubs, and brawlers |
| `/maps`        | `Maps`        | Shows active and upcoming maps                   |
| `/info`        | `Info`        | Project information and about page               |

Example simplified structure:

```tsx
<Route path="/" element={isTablet ? <DesktopLayout /> : <MobileLayout />}>
  <Route index element={<Home />} />
  <Route path="brawlers" element={<BrawlersPage />} />
  <Route path="ranks" element={<Ranks />} />
  <Route path="maps" element={<Maps />} />
  <Route path="info" element={<Info />} />
</Route>
```

This setup ensures consistent navigation behavior between mobile and desktop layouts while maintaining a single routing logic source.

## RoutesWithNotFound

The `RoutesWithNotFound` component wraps all defined routes and adds fallback behavior for unknown paths.  
It defines two additional routes:

- `/404` renders the `NotFound` component.
- Any undefined path (`*`) automatically redirects to `/404`.

This guarantees that any incorrect or outdated URL leads the user to a dedicated not-found page instead of a blank screen.

Example:

```tsx
<Routes>
  {children}
  <Route path="/404" element={<NotFound />} />
  <Route path="*" element={<Navigate to="/404" />} />
</Routes>
```

## Integration with App

The routing system is mounted at the root level inside `App.tsx`:

```tsx
import { AppRouter } from "@/routes";

function App() {
  return <AppRouter />;
}

export default App;
```

This setup keeps the router self-contained and easy to maintain, ensuring that all navigation logic is centralized under `src/routes/`.

## Summary

The routing system follows these principles:

- Uses React Router v7 for reliable navigation.
- Implements lazy loading for all main pages.
- Detects viewport size to render the correct layout dynamically.
- Provides centralized 404 handling through `RoutesWithNotFound`.
- Keeps routing logic isolated from presentation components.

This design achieves a clean, scalable, and responsive routing architecture that adapts seamlessly to both desktop and mobile environments.
