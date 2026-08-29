import { defineConfig } from "drizzle-kit";

// `generate` doesn't connect; `migrate` / `studio` do and will fail loudly on the
// placeholder if DATABASE_URL isn't set.
const url = process.env.DATABASE_URL ?? "postgresql://placeholder:placeholder@localhost:5432/placeholder";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
