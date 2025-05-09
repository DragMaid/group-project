# 🧩 Git Usage Standards & Branching Strategy

This document defines the **Git workflow**, **branch naming conventions**, and **merge policies** for collaborating on this monorepo (Next.js + Prisma + Turborepo).

---

## ✅ Global Conventions

- Use **feature branches** for all work.
- All changes must go through a **Pull Request (PR)** into `dev`.
- The `dev` and `main` branches are **protected**:
  - Cannot be pushed to directly
  - Must be updated via PR
- Every PR **must be tested via Docker deploy** before merge.

---

## 🌿 Branch Naming Convention

Branches must follow the pattern:

```
<role>/<content>
```

### 🎭 Role Prefixes

| Prefix    | Purpose                          |
|-----------|----------------------------------|
| `front/`  | Frontend-related changes (Next.js) |
| `back/`   | Backend/API work (e.g. controllers, routes) |
| `db/`     | Database/Prisma/migrations        |
| `docs/`   | Documentation updates             |
| `chore/`  | Tooling, setup, CI, formatting    |
| `fix/`    | Bugfixes (include in relevant scope) |

### 🧠 Examples

| Branch Name         | Meaning                             |
|---------------------|-------------------------------------|
| `front/test`        | Frontend test-related changes       |
| `back/authentication` | Backend authentication module      |
| `db/migration-users`  | DB migration for users table       |
| `docs/readme-update`  | Updating README or docs            |
| `chore/turbo-config`  | Changing Turborepo setup           |

---

## 🔁 Pull Request Workflow

1. **Create a branch** from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b front/new-feature
   ```

2. **Commit changes** using conventional commit format:
   ```
   feat(front): add login form component
   fix(back): handle missing auth token
   chore(db): format Prisma schema
   ```

3. **Test the code with Docker** before opening PR:
   ```bash
   pnpm --filter @webapp deploy
   ```

4. **Push your branch** and open a PR into `dev`:
   ```bash
   git push -u origin front/new-feature
   ```

5. Review will ensure:
   - Code passes CI
   - `pnpm test` runs clean
   - Docker deployment works
   - Team review/approval

6. After approval, the PR can be merged into `dev`.

---

## 🚀 Release Process

> Only leads or release engineers should do this.

1. Ensure `dev` is stable and tested.
2. Create a PR from `dev` → `main`.
3. Merge using **Squash & Merge**.
4. Tag release (e.g. `v1.0.0`) and push.

---

## 💡 Additional Tips

- Keep PRs **small and focused** (1 topic at a time).
- Always **pull latest `dev`** before creating a new branch.
- Run:
  ```bash
  pnpm install && pnpm dev
  ```
  to verify local setup works.
- Add meaningful descriptions to all PRs.

---

## 🧾 Summary

| Rule                          | Required |
|-------------------------------|----------|
| Branch follows `<role>/<content>` | ✅ Yes |
| PR required to merge to `dev` | ✅ Yes |
| `dev`/`main` are protected     | ✅ Yes |
| Docker deploy before PR merge | ✅ Yes |
| Conventional commits           | ✅ Yes |
| Tests and lint must pass       | ✅ Yes |

---

Happy coding! 🚀

