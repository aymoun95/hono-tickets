import { sql } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { usersTable } from "./users";

export const ticketsTable = sqliteTable("tickets", {
	id: int().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	price: real().notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => usersTable.id),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: text("updated_at")
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const insertTicketsSchema = createInsertSchema(ticketsTable, {
	price: z.coerce.number(),
});

export const selectTicketsSchema = createSelectSchema(ticketsTable);
