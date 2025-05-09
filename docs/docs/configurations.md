# 🛠 Project Configuration Guide (Jest, TypeScript, ESLint, Tailwind, Next.js)

This document explains the core configuration files used in the project: **Jest**, **TypeScript**, **ESLint**, **Tailwind**, and **Next.js** — with line-by-line explanations.

---

## ✅ `jest.config.base.mjs`

```ts
/** @type {import('jest').Config} */
const jestBaseConfig = {
  testEnvironment: 'node', // Default environment for running backend-like tests
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json', // Use TS config to compile tests
    }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'], // Supported file types
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/dist/'], // Ignore build/output paths
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/', '/dist/'] // Same for coverage reporting
};

export default jestBaseConfig;
```

---

## ✅ `jest.config.mjs` (Project-Specific)

```ts
import base from '../../jest.config.base.mjs';

const jestConfig = {
  ...base, // Extend from base config
  displayName: 'web', // Label in test output
  rootDir: '.', // Root dir for Jest context
  testEnvironment: 'jsdom', // Use browser-like DOM for frontend tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Additional setup per test file
  testMatch: ['<rootDir>/**/*.(test|spec).ts?(x)'], // File pattern to look for tests
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports for Jest
  },
};

export default jestConfig;
```

---

## ✅ `tsconfig.base.json`

```json
{
  "compilerOptions": {
    "target": "ES2017", // JS features allowed
    "lib": ["dom", "dom.iterable", "esnext"], // Include modern browser APIs
    "allowJs": true, // Allow .js files in the project
    "skipLibCheck": true, // Speeds up build by skipping type checks on node_modules
    "strict": true, // Enable strict type checking
    "noEmit": true, // Don't output compiled files
    "esModuleInterop": true, // For better compatibility with CommonJS modules
    "module": "esnext", // Use modern ES module format
    "moduleResolution": "bundler", // Match Node.js-like module resolution
    "resolveJsonModule": true, // Allow importing JSON
    "isolatedModules": true, // Ensures each file can be transpiled individually
    "jsx": "preserve", // Don’t touch JSX output (Next.js handles this)
    "incremental": true, // Speed up subsequent builds
    "plugins": [
      {
        "name": "next" // Next.js-specific TypeScript optimizations
      }
    ],
    "paths": {
      "@/*": ["./src/*"], // Path alias for local source
      "@ui/*": ["packages/ui/*"], // Shared UI package
      "@root/*": ["*./*"] // Custom alias to root (note: this looks miswritten)
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## ✅ `tsconfig.json` (Web Project)

```json
{
  "extends": "../../tsconfig.base.json", // Inherit from base config
  "compilerOptions": {
    "outDir": "dist" // Output build directory
  },
  "include": ["src", "next-env.d.ts"], // Files to compile
  "exclude": ["node_modules"] // Exclude external dependencies
}
```

---

## ✅ `eslint.config.mjs`

```ts
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url); // Convert module URL to path
const __dirname = dirname(__filename); // Get directory path

const compat = new FlatCompat({
  baseDirectory: __dirname, // Required for legacy eslint compatibility
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"), // Extend Next.js + TS lint rules
];

export default eslintConfig;
```

---

## ✅ `tailwind.config.js`

```ts
/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Include `app/` pages/components
    './pages/**/*.{js,ts,jsx,tsx}', // Include `pages/` directory
    './components/**/*.{js,ts,jsx,tsx}', // Include components folder
  ],
  theme: {
    extend: {}, // Custom theme extensions (colors, fonts, etc.)
  },
  plugins: [], // Add Tailwind plugins here
};

export default tailwindConfig;
```

---

## ✅ `next.config.mjs`

```ts
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true, // Warn for unsafe React practices
  output: 'standalone', // Allow deployment as standalone Docker container
};

export default nextConfig;
```

---

## 💡 Summary Table

| Config File            | Purpose                              |
|------------------------|--------------------------------------|
| `jest.config.base.mjs` | Shared Jest base config              |
| `jest.config.mjs`      | Jest config customized per package   |
| `tsconfig.base.json`   | Shared TypeScript settings           |
| `tsconfig.json`        | Package-specific overrides (e.g. `web`) |
| `eslint.config.mjs`    | Linting rules (Next.js + TypeScript) |
| `tailwind.config.js`   | TailwindCSS setup for styling        |
| `next.config.mjs`      | Next.js behavior and optimizations   |

---
