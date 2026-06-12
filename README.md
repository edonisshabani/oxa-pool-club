# Oxa Pool Club — Event Invitations

A luxury French Riviera–themed invitation web app built with **Next.js (App Router)** and **Tailwind CSS**.

## Features

- **Public invitation page** (`/invite/[guestId]`) with envelope open animation and personalized guest name
- **Query param support** (`/invite?guest=john-doe`) redirects to the canonical slug route
- **Admin dashboard** (`/admin`) to add guests, copy invitation links, and delete entries
- **File-based guest storage** (`data/guests.json`) — swap `guestRepository` in `src/lib/guests/index.ts` for Supabase/Prisma later
- **Oxa logo** rendered from `public/oxa-logo.pdf`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Admin access

- URL: `/admin`
- Set `ADMIN_PASSWORD` in `.env.local` for local development (see `.env.local.example`)
- Set `ADMIN_PASSWORD` in Vercel Environment Variables for production

### Invitation URLs

After adding a guest in admin, links look like:

```
http://localhost:3000/invite/john-doe
```

## Project structure

```
src/
  app/
    invite/[guestId]/   # Public invitation
    invite/             # ?guest= query redirect
    admin/              # Protected dashboard
    api/guests/         # REST API for guest CRUD
  components/
    invite/             # Envelope, card, logo
    admin/              # Dashboard UI
  lib/
    guests/             # Repository pattern (file + localStorage)
```

## Customization

- Event details: `src/lib/constants.ts` → `EVENT_DETAILS`
- Logo: replace `public/oxa-logo.pdf`
- Colors & fonts: `src/app/globals.css` and `src/lib/constants.ts`

## Deploy (Vercel — free)

1. Push this repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add **Upstash Redis** from the Vercel Marketplace (Storage tab) — free tier persists guest data on serverless.
4. Set `ADMIN_PASSWORD` in Vercel Environment Variables.

The app auto-uses Upstash when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set; otherwise it uses `data/guests.json` locally.
