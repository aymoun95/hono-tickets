import { Database } from "bun:sqlite";
import { env } from "@/lib/config";
import { drizzle } from "drizzle-orm/bun-sqlite";

const sqlite = new Database(env.DB_FILE_NAME);
const db = drizzle({ client: sqlite });

export default db;
