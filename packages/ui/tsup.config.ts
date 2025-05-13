import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["components/**/*.{ts,tsx}"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  target: "esnext",
  watch: process.env.DEV === "true",
  external: ["react", "react-dom"],
});
