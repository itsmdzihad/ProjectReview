# CodePath

CodePath is a course learning platform with a Next.js frontend and an Express API backed by PostgreSQL and Prisma.

## Project layout

- `client/` — Next.js web application (default development URL: `http://localhost:3000`)
- `backend/` — Express API (default development URL: `http://localhost:5000`)
- [`api.md`](backend/api.md) — API endpoint documentation for the [backend](backend/)

## Requirements

- Node.js 20 or later and npm
- PostgreSQL 15 or later, running locally or hosted

## Environment setup

Environment files are ignored by Git. Create one in each app directory; the backend and frontend load separate variables.

### Backend

Create `backend/.env`:

```env
PORT=5000
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/codepath?schema=public"
nodeEnv=dev
SECRET="replace-this-with-a-long-random-secret"
BCRYPT_SALT_ROUNDS=10
```

- `PORT` is the API port.
- `DATABASE_URL` is your PostgreSQL connection string. Create the `codepath` database first, or change the database name to one you already have.
- `nodeEnv` controls development error details; use `dev` locally.
- `SECRET` is used to sign authentication tokens. Set a private, random value.
- `BCRYPT_SALT_ROUNDS` controls password hashing work; `10` is a reasonable local setting.

### Frontend

Create `client/.env`:

```env
BACKEND_URL=http://localhost:5000/api/v1
```

`BACKEND_URL` is the API base URL, including `/api/v1`. It is a server-side variable, so it does not need a `NEXT_PUBLIC_` prefix.

## Run locally

1. Install dependencies in both apps:

   ```bash
   cd backend && npm install
   cd ../client && npm install
   ```

2. Configure `backend/.env` and `client/.env` as shown above, and make sure PostgreSQL is running.

3. From `backend/`, apply the database migrations:

   ```bash
   npx prisma migrate dev --config prisma7.config.ts
   ```

4. Start the API. In one terminal, from `backend/`, build and start it:

   ```bash
   npm run build
   npm start
   ```

   For development with automatic rebuilds, use two backend terminals instead: run `npm run buildDev` in one, then `npm run dev` in the other. `buildDev` watches TypeScript sources, while `dev` runs the compiled server and restarts it when output changes.

5. In another terminal, from `client/`, start the frontend:

   ```bash
   npm run dev
   ```

Open `http://localhost:3000`. Check that the API is up at `http://localhost:5000/api/v1/health`.

On startup, the backend seeds a demo mentor if one does not already exist:

- Email: `mentor@codepath.dev`
- Password: `Mentor@12345`

Use this account only for local development; change or remove it before deploying with real users.

## Useful commands

Run these from the relevant app directory:

| App | Command | Purpose |
| --- | --- | --- |
| Backend | `npm run build` | Generate Prisma Client and compile TypeScript |
| Backend | `npm start` | Start the compiled API |
| Backend | `npm run buildDev` | Watch and compile backend TypeScript |
| Backend | `npm run dev` | Run/restart the compiled API during development |
| Client | `npm run dev` | Start the Next.js development server |
| Client | `npm run build` | Build the frontend for production |
| Client | `npm run lint` | Run ESLint |

