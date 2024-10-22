import { sql } from "drizzle-orm";
import { index, int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const ticketsTable = sqliteTable(
	"tickets",
	{
		id: int().primaryKey({ autoIncrement: true }),
		title: text().notNull(),
		price: real().notNull(),
		userId: text("user_id").notNull(),
		createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
		updatedAt: text("updated_at")
			.default(sql`(CURRENT_TIMESTAMP)`)
			.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
	},
	(table) => {
		return {
			userIdIdx: index("user_id_idx").on(table.userId),
		};
	},
);

export const insertTicketsSchema = createInsertSchema(ticketsTable);
export const selectTicketsSchema = createSelectSchema(ticketsTable);
