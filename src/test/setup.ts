import { beforeAll, beforeEach } from "bun:test";
import db from "@/db";
import {} from "drizzle-orm";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import * as tables from "./tables";
async function runMigrations() {
	console.log("🏋🏼 Running migrations");

	await migrate(db, { migrationsFolder: "src/db/migrations" });

	console.log("✅ Migrated successfully");
}

async function resetDB() {
	const schemas = Object.values(tables);
	for (const table of schemas) {
		await db.delete(table);
	}
}

beforeAll(async () => {
	runMigrations().catch((e) => {
		console.error("Migration failed");
		console.error(e);
		process.exit(1);
	});
});

beforeEach(async () => {
	resetDB().catch((e) => {
		console.error(e);
	});
});
