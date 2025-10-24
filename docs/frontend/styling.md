# Styling

The frontend of **Brawl Stats v2** uses **Tailwind CSS v4** as its main styling framework.  
The design system follows a utility-first approach, with minimal custom CSS and a focus on responsive, consistent, and accessible layouts.

## Core principles

- **Utility-first design:** All components are styled using Tailwind utility classes, ensuring a consistent visual language and minimal CSS overhead.
- **Theming through custom properties:** The global theme is defined in `src/index.css` using CSS variables under the `@theme` block.
- **Typography and colors are centralized**, enabling consistent scaling and color use across all components.
- **Custom fonts and scrollbars** are added as global enhancements while keeping the Tailwind base intact.

## Global stylesheet

All global styling resides in `src/index.css`.  
It includes the Tailwind import, font registration, theme variables, and small reusable style rules.

```css
@import "tailwindcss";

@font-face {
  font-family: "BrawlStars";
  src: url("/fonts/lilitaone-regular.ttf");
  font-weight: normal;
  font-style: normal;
}
```

### Theme definition

The `@theme` section defines the core visual tokens of the project, including typography scales and color variables.

```css
@theme {
  --font-brawlstars: "BrawlStars", sans-serif;

  /* Text sizes */
  --text-h1: clamp(2rem, 5vw, 3.5rem);
  --text-h2: clamp(1.75rem, 4vw, 3rem);
  --text-h3: clamp(1.5rem, 3.5vw, 2.5rem);
  --text-h4: clamp(1.25rem, 3vw, 2rem);
  --text-h5: clamp(1.125rem, 2.5vw, 1.5rem);
  --text-h6: clamp(1rem, 2vw, 1.25rem);
  --text-p: clamp(0.875rem, 1.5vw, 1rem);

  /* Rarity colors */
  --color-common: #b9eaff;
  --color-rare: #e1fb2a;
  --color-super-rare: #5ab3ff;
  --color-epic: #d850ff;
  --color-mythic: #fe5e72;
  --color-legendary: #fff11e;
  --color-ultra-legendary: #68fd58;
}
```

These variables are used by components and utilities to maintain consistent text sizes and color usage across the interface.

### Custom scrollbar

A small set of utility classes is defined to enhance scrollbar styling across pages:

```css
@layer components {
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #555 transparent;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 9999px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
}
```

This class can be applied to scrollable containers for a clean and modern appearance.

## Color palette

The general color system relies on **neutral backgrounds** complemented by **cyan** and **amber accents**.  
These accent tones reflect the Brawl Stars aesthetic while maintaining readability in both light and dark contexts.  
Additional **emerald** tones are used for secondary highlights and success states.

- **Base UI:** Neutral tones for backgrounds, text, and borders.
- **Primary accents:** Cyan for player-related components and amber for club-related components.
- **Secondary accents:** Emerald for map components and confirmation elements.
- **Rarity colors:** Defined as custom variables (`--color-rare`, `--color-legendary`, etc.) for consistent representation of in-game brawler rarities.

## Typography

The application uses a single custom font, **Lilita One**, referenced as `BrawlStars`.  
It is loaded globally and applied through the custom variable `--font-brawlstars`.  
Fallbacks include `sans-serif` for improved rendering consistency across browsers.

Font scaling is responsive using `clamp()`, ensuring readable titles and paragraphs across all devices.

## Responsive design

Tailwind’s responsive utilities are used extensively to create adaptive layouts.  
Breakpoints follow the default Tailwind convention:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

The layout system dynamically switches between mobile and desktop dashboards using the custom hook `useMediaQuery("(min-width: 768px)")`.

## Styling conventions

- Use Tailwind classes directly in component JSX rather than custom CSS.
- For consistent font sizing, use theme variables (`-text-h1`, `-text-p`, etc.) when necessary.
- Global variables are referenced only in shared or layout components; page-specific components rely on Tailwind utilities.
- Avoid inline styles except for dynamic calculations.
- Custom animations and transitions should use Tailwind’s built-in utilities or the `motion` library when available.

## Summary

The styling layer in Brawl Stats v2 emphasizes clarity, modularity, and scalability.  
By combining Tailwind CSS utilities, global theme variables, and a consistent color and typography system, the application maintains a cohesive visual identity while remaining easy to extend and maintain.
