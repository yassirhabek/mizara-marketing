import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { serverEnv } from "@/lib/env";
import * as schema from "./schema";

// Lazy singleton — constructed on first request, not at module load, so `next build`
// (which imports route modules to collect config) doesn't need a DATABASE_URL.
const globalForDb = globalThis as unknown as {
  __mizaraDb?: PostgresJsDatabase<typeof schema>;
};

export function getDb(): PostgresJsDatabase<typeof schema> {
  if (globalForDb.__mizaraDb) return globalForDb.__mizaraDb;
  const sql = postgres(serverEnv().DATABASE_URL, { prepare: false, max: 1 });
  const instance = drizzle(sql, { schema });
  globalForDb.__mizaraDb = instance;
  return instance;
}
