import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import path from "path";

// Carrega o arquivo .env da raiz do monorepo
config({ path: path.resolve(__dirname, "../../.env") });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
  verbose: true
});