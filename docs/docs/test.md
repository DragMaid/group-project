# ✅ Testing Guide

This guide covers **how to write tests**, **where to place them**, and **how to run them** using [Jest](https://jestjs.io/). Our goal is to maintain a test coverage of **at least 80%** across all projects in this monorepo.

---

## 📌 Why Testing Matters

Testing ensures our code works as expected, remains stable with new changes, and catches bugs early before hitting production.

---

## 🔍 Types of Tests

| Type            | Purpose                                                       | Priority                |
| --------------- | ------------------------------------------------------------- | ----------------------- |
| **Unit Tests**  | Test small, isolated functions or components                  | 🟢 High                 |
| **Integration** | Test interactions between components/services (e.g. DB + API) | 🟡 Medium               |
| **E2E Tests**   | Test full workflows from start to finish (via UI/API)         | 🟠 Optional (if needed) |

---

## 🥇 What to Prioritize

- 🧪 Critical business logic (auth, payments, etc.)
- 🔄 Pure functions
- ⚠️ Edge cases and failure scenarios
- 🔗 API + DB integration
- 🧱 Reusable components (React, shared packages)

---

## 📁 Test Folder Structure

Tests should follow the same folder hierarchy as the code and live next to the file being tested or inside a dedicated `__tests__` folder.

```
web/
  src/
    components/
      Button.tsx
      Button.test.tsx       ← unit test (local)
    pages/
      api/
        auth.ts
        auth.test.ts        ← integration test

db/
  seed.ts
  seed.test.ts              ← unit or integration

__tests__/
  e2e/
    login.test.ts           ← optional E2E test
```

You may also use:

```
<file>.test.ts(x)  // preferred
<file>.spec.ts(x)  // also accepted
```

---

## 🛠️ Writing Tests with Jest

### ✅ Unit Test (Function)

```ts
// utils/math.ts
export function add(a: number, b: number) {
  return a + b;
}
```

```ts
// utils/math.test.ts
import { add } from "./math";

describe("add()", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

---

### 🧪 Unit Test (React Component)

```tsx
// components/Button.tsx
export default function Button({ label }: { label: string }) {
  return <button>{label}</button>;
}
```

```tsx
// components/Button.test.tsx
import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("renders a button with label", () => {
  render(<Button label="Click me" />);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});
```

---

### 🔄 Integration Test

```ts
// pages/api/user.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "Jane Doe" });
}
```

```ts
// pages/api/user.test.ts
import handler from "./user";
import { createMocks } from "node-mocks-http";

test("GET /api/user returns a name", async () => {
  const { req, res } = createMocks({ method: "GET" });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(JSON.parse(res._getData())).toEqual({ name: "Jane Doe" });
});
```

---

## ▶️ Running Tests

Make sure to run tests regularly! You can do it in several ways:

### 1. Run All Tests from Root

```bash
pnpm run test
```

> Runs all tests across the monorepo and outputs coverage (ensure it's >80%).

---

### 2. Run Tests for a Specific Package

Use `--filter` to run only one workspace (e.g. `@webapp`, `@db`):

```bash
pnpm run test --filter @webapp
```

Or for just DB:

```bash
pnpm run test --filter @db
```

---

### 3. Run Tests from Within a Folder

Navigate directly to the project folder:

```bash
cd apps/web
pnpm run test
```

> This is handy when working only on one app/package.

---

## 📈 Check Coverage

```bash
pnpm run test -- --coverage
```

> This generates a `coverage/` folder with detailed HTML reports.

Open `coverage/lcov-report/index.html` in a browser to view.

---

## 🧼 Testing Best Practices

- ✅ Write meaningful `describe` and `it` names
- 🧪 Mock external services for unit tests
- 🔄 Avoid testing implementation details
- 💡 Use `beforeEach` to set up common logic
- 🚨 Don’t skip tests unless temporary (`test.skip`)
- 📉 Use `.only` sparingly (`test.only` runs only that test)

---

## 🚀 Goal

All new PRs should maintain or improve test coverage.
**Minimum required: 80%**

Happy Testing! 💙
