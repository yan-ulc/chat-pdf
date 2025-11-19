import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // ganti "driver" → "dialect"
  dbCredentials: {
    url: process.env.DATABASE_URL!, // ganti "connectionString" → "url"
  },
} satisfies Config;
