import { defineConfig } from "tsup";
import fg from "fast-glob";

export default defineConfig(async () => {
  const files = await fg(["components/**/*.{ts,tsx}"]);

  if (files.length === 0) {
    //console.log("No source files found. Skipping build.");
    return [];
  }

  return {
    entry: files,
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
