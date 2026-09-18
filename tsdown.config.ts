import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/main.ts"],
    format: ["esm"],
    dts: true,
    outDir: "dist/esm",
    sourcemap: true,
  },
  {
    entry: ["src/main.ts"],
    format: ["cjs"],
    dts: true,
    outDir: "dist/cjs",
    sourcemap: true,
  },
]);
