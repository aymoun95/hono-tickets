import { getTableColumns, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const usersTable = sqliteTable("users", {
	id: int().primaryKey({ autoIncrement: true }),
	email: text().notNull().unique(),
	password: text().notNull(),
	name: text().notNull(),
	age: int().notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: text("updated_at")
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(usersTable, {
	age: z.coerce.number(),
	email: z.string().email(),
	password: z.string().min(4).max(20),
});
// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(usersTable).omit({
	password: true,
});

const { password, ...usersWithExcludedPassword } = getTableColumns(usersTable);

export { usersWithExcludedPassword };
