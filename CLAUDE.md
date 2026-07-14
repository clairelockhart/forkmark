# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server on port 5173
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # oxlint (see .oxlintrc.json)
```

There is no test suite configured in this repo.

## Architecture

Forkmark is a mobile-first React 19 + Vite restaurant-logging app, styled with Tailwind CSS v3 and backed by Supabase (auth + Postgres).

**Data flow (top to bottom):**
- `src/services/restaurants.js` — the only module that talks to Supabase for restaurant data. Converts between DB snake_case rows and frontend camelCase objects (`fromDb`/`toDb`). All reads/writes go through here.
- `src/context/RestaurantContext.jsx` — holds restaurant list state via `useReducer`, refetches from the service whenever `user` (from `AuthContext`) changes.
- `src/hooks/useRestaurants.js` — thin hook wrapping the context + service calls (`add`/`update`/`remove`) that components actually use.
- `src/lib/supabase.js` — creates the single Supabase client from `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (in `.env.local`); throws at import time if either is missing.

**Auth:**
- `src/context/AuthContext.jsx` wraps `supabase.auth` (session, `signUp`, `signIn`, `signOut`) and listens for `onAuthStateChange`.
- `src/hooks/useAuth.js` is a passthrough to `useAuthContext`.
- `src/components/layout/ProtectedRoute.jsx` gates all routes except `/auth`, redirecting unauthenticated users there.
- RLS in Supabase filters restaurant rows by the authenticated user, so queries in `services/restaurants.js` never pass `user_id` explicitly.

**Routing** (`src/App.jsx`): `AuthProvider` > `BrowserRouter` > `RestaurantProvider` > `Routes`. `/auth` is public; `/`, `/add`, `/edit/:id`, `/restaurant/:id`, `/share`, `/settings` are behind `ProtectedRoute`.

**UI shell:** `src/components/layout/PageWrapper.jsx` provides the sticky header + scrollable content area + `BottomNav`, used by every page. `BottomNav` drives the four primary sections (My List, Add, Share, Settings).

**Restaurant shape** (camelCase, as used throughout the frontend): `id, name, city, cuisine, status ('been'|'want'), rating, notes, dishes, wouldReturn, tags[], source, createdAt, visitedAt`. `src/mock/restaurants.js` contains sample data in this shape but is not currently wired into the app — treat it as reference/fixture data only, not a live data source.

**Styling:** Tailwind theme in `tailwind.config.js` defines an `accent` (amber) color, `success` (green), `star` color, and a `mobile` max-width (430px) used to constrain layout on larger screens.
