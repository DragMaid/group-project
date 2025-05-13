# 🛠 Developer Manual for Monorepo (Next.js + Turborepo + Prisma)

Welcome to the project! This monorepo uses **Next.js** (with Turbopack), **Turborepo** for task orchestration, **Prisma** for database management, and **pnpm** as the package manager.

---

## 📦 Project Structure Overview

```
apps/
├── web/     → Frontend app (Next.js)
├── api/     → Backend services (if applicable)

packages/
├── db/      → Prisma + DB container setup
├── ui/      → Shared UI components
```

---

## 📥 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

> This installs all dependencies across all packages using `pnpm` workspaces.

### 2. Start development server (Next.js)

```bash
pnpm --filter @webapp dev
```

Starts the frontend using **Turbopack** (`next dev --turbopack`) for blazing-fast development.

---

## 🧪 Testing

### Run all tests (with coverage):

#### For web:

```bash
pnpm --filter @webapp test
```

#### For db:

```bash
pnpm --filter @db test
```

> All test suites use Jest with a per-package `jest.config.mjs`.

---

## 🧼 Linting

Run the Next.js linter on the frontend:

```bash
pnpm --filter @webapp lint
```

---

## ⚙️ Build & Start

### Build the web frontend:

```bash
pnpm --filter @webapp build
```

### Start the production server (after build):

```bash
pnpm --filter @webapp start
```

---

## 🐘 Database Management (Prisma)

All DB scripts are exposed through the `@webapp` package using `pnpm --filter=@db`, so you only need to run them from root.

### Start the DB container

```bash
pnpm db:up
```

### Stop and clean DB containers

```bash
pnpm db:down
```

### Build DB container (Docker)

```bash
pnpm db:build
```

### Generate Prisma Client

```bash
pnpm db:generate
```

### Apply pending migrations (development)

```bash
pnpm db:migrate
```

### Push schema to database (no migration)

```bash
pnpm db:push
```

### Reset the database

```bash
pnpm db:reset
```

### Format Prisma schema

```bash
pnpm db:format
```

### Open Prisma Studio

```bash
pnpm db:studio
```

### Seed the database

```bash
pnpm db:seed
```

---

## 🚀 Deployment (Docker)

To build and deploy the **web app** via Docker Compose:

```bash
pnpm --filter @webapp deploy
```

This will:

- Build the web container
- Remove orphan containers
- Spin up only the `web` service as defined in `docker-compose.yml`

---

## 🧠 Bonus Tips

### Run any script with Turbo

You can also use `turbo run <script>` to run a script across the monorepo. For example:

```bash
turbo run lint --filter=@webapp
```

### Run a script in just one package

```bash
pnpm --filter @db <script>
pnpm --filter @webapp <script>
```

### Use dotenv with Prisma commands (already done in `web` scripts)

Most DB-related commands in `@webapp` are wrapped with:

```bash
pnpm dotenv-flow -e .env -- pnpm --filter=@db <command>
```

This ensures environment variables are loaded from `.env`.

---

## ✅ Recommended Dev Flow

1. `pnpm install`
2. `pnpm db:up`
3. `pnpm db:generate`
4. `pnpm db:migrate`
5. `pnpm db:seed`
6. `pnpm dev` (from `@webapp`)
7. Code, test, commit!
8. `pnpm test`, `pnpm lint`, `pnpm build`

---

## 🧾 Scripts Summary

| Script        | Description                              |
| ------------- | ---------------------------------------- |
| `dev`         | Start frontend dev server with Turbopack |
| `build`       | Build Next.js app                        |
| `start`       | Start built Next.js app                  |
| `lint`        | Lint frontend code                       |
| `test`        | Run tests with Jest                      |
| `deploy`      | Run web container with Docker Compose    |
| `db:up`       | Start DB container                       |
| `db:down`     | Stop DB container                        |
| `db:build`    | Build DB Docker image                    |
| `db:generate` | Generate Prisma client                   |
| `db:migrate`  | Run Prisma migrations                    |
| `db:push`     | Push schema to DB (no migration)         |
| `db:reset`    | Reset the database                       |
| `db:studio`   | Launch Prisma Studio UI                  |
| `db:format`   | Format Prisma schema                     |
| `db:seed`     | Seed the database                        |

---

Feel free to extend this guide for `@api`, `@ui`, or CI/CD workflows!
