import { defineConfig } from "tsup";
import fs from "fs";

const hasSourceFiles =
  fs.existsSync("src") &&
  fs
    .readdirSync("src")
    .some((file) => file.endsWith(".ts") || file.endsWith(".tsx"));

export default defineConfig(() => {
  if (!hasSourceFiles) {
    //console.log("No source files found. Skipping build.");
    return [];
  }

  return {
    entry: ["./components/**/*.{ts,tsx}"],
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    outDir: "dist",
    target: "esnext",
    watch: process.env.DEV === "true",
    external: ["react", "react-dom"],
  };
});
