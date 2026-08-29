import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const waitlist = pgTable(
  "waitlist",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name"),
    locale: text("locale").notNull().default("nl"),
    source: text("source"),
    utm: text("utm"),
    ip: text("ip"),
    userAgent: text("user_agent"),
    unsubToken: text("unsub_token"),
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("waitlist_created_at_idx").on(t.createdAt)],
);

export type WaitlistRow = typeof waitlist.$inferSelect;
export type NewWaitlistRow = typeof waitlist.$inferInsert;
