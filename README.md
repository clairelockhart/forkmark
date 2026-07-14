# Forkmark

A mobile-first restaurant logging app — track places you've been and places you want to try, with ratings, notes, and tags. Built with React 19 + Vite, styled with Tailwind CSS, and backed by Supabase for auth and data.

## Prerequisites

- Node.js (v18+ recommended)
- A [Supabase](https://supabase.com) project (free tier is fine)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy the example env file and fill in your Supabase project credentials:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local`:

   ```
   VITE_SUPABASE_URL=https://<project-id>.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_...
   ```

   You can find these values in your Supabase project under **Settings → API**.

3. **Set up the database**

   In your Supabase project, create a `restaurants` table with a `user_id` column referencing `auth.users`, plus columns for the restaurant fields (name, city, cuisine, status, rating, notes, dishes, would_return, tags, source, created_at, visited_at). Enable Row Level Security (RLS) so each user can only read/write their own rows.

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

## Scripts

| Command           | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`       | Start the Vite dev server            |
| `npm run build`     | Build for production                 |
| `npm run preview`   | Preview the production build locally |
| `npm run lint`      | Run oxlint                           |

## Tech stack

- React 19 + Vite
- Tailwind CSS v3
- React Router v7
- Supabase (auth + Postgres)
- Lucide React (icons)

See `CLAUDE.md` for architecture notes.
