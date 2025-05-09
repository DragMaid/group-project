# 📦 Managing Dependencies with PNPM in a Monorepo

This guide covers how to install and use [`pnpm`](https://pnpm.io/) properly in a monorepo project, how it differs from `npm`/`yarn`, and best practices for dependency management.

---

## 🚀 Installing PNPM

You can install `pnpm` globally using:

```bash
npm install -g pnpm
```

Check it's installed:

```bash
pnpm -v
```

---

## 🧠 How PNPM Works (vs npm/yarn)

- PNPM uses a **global content-addressable store** for dependencies.
- It creates **symlinks** in the `node_modules` directory instead of copying files.
- In a monorepo, PNPM **automatically hoists** shared packages to the root `node_modules` for efficiency.
- Fast, disk-efficient, and avoids duplication.

---

## 🗂️ Monorepo Best Practices

- Your monorepo has a single `node_modules` directory at the **root level**.
- If you find a `node_modules` folder **inside a subproject (e.g. `web/`, `db/`)**, something is **wrong**:
  - You may have used `npm` or `yarn` accidentally.
  - You might have added a dependency without `-w` or incorrect filters.

> ✅ Always add dependencies from the **root directory** using PNPM.

---

## 📥 Installing Dependencies

### Add a regular dependency

```bash
pnpm add <package-name>
```

### Add a dev-only dependency

```bash
pnpm add -D <package-name>
# or
pnpm add --save-dev <package-name>
```

> 🧪 Use this for tools like Jest, ESLint, Prettier, etc. that are only needed during development.

---

## 🧩 Scoped Installation (Monorepo)

### Add a dependency to a specific package (e.g. `web`)

```bash
pnpm add <package-name> --filter=@webapp
```

### Add dev-only dependency to a specific package

```bash
pnpm add -D <package-name> --filter=@webapp
```

---

## 🏢 Use the `-w` Flag (Workspace Root)

```bash
pnpm add <package-name> -w
```

> Use `-w` to install a dependency at the **workspace root** when it's shared across packages (e.g. linting tools, `dotenv-flow`, `turbo`, etc.).

---

## 🎯 Filters

PNPM allows fine-grained control using `--filter`.

```bash
pnpm --filter=@webapp <command>
```

Examples:

```bash
pnpm --filter=@webapp install
pnpm --filter=@db add prisma
```

---

## 🌱 Production vs Dev Installations

### Install only production dependencies

```bash
pnpm install --prod
```

> Use this in **Docker builds** or production environments.

### Install only dev dependencies

```bash
pnpm install --only dev
```

> Not common in CI/CD but useful if you're debugging dev-only issues.

---

## 🧹 Clean Install

When troubleshooting dependency issues:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 🛑 Common Mistakes to Avoid

- ❌ Running `npm install` or `yarn` inside packages — always use `pnpm`.
- ❌ Creating local `node_modules` — dependencies should resolve to the root `node_modules`.
- ❌ Forgetting `-w` or `--filter` when adding packages — can lead to pollution or misconfiguration.

---

## ✅ TL;DR Commands

| Use Case                             | Command                                           |
|--------------------------------------|---------------------------------------------------|
| Add shared dev tool to root          | `pnpm add -Dw eslint`                            |
| Add runtime dep to `web` package     | `pnpm add react --filter=@webapp`                |
| Add dev-only dep to `db` package     | `pnpm add -D prisma --filter=@db`                |
| Install production-only deps         | `pnpm install --prod`                            |
| Run command for specific package     | `pnpm --filter=@webapp build`                    |

---

For more, visit [pnpm.io](https://pnpm.io) or check the `.npmrc` and `pnpm-workspace.yaml` in the repo root.

