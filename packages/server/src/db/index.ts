import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../config/env";

config({ path: ".env" });
const client = postgres(env.DATABASE_URL!);
export const db = drizzle(client);