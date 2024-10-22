import db from "@/db";
import { insertTicketsSchema, ticketsTable } from "@/db/schema/tickets";
import { NotFoundError } from "@/errors/not-found-error";
import { AppBindingsHono } from "@/lib/types";
import { requireAuth } from "@/middlewares/require-auth";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";

const updateTicketRouter = new AppBindingsHono();

updateTicketRouter.put(
	"/tickets/:id{[0-9]+}",
	requireAuth,
	zValidator("form", insertTicketsSchema.partial()),
	async (c) => {
		const id = Number.parseInt(c.req.param("id"));
		const updates = c.req.valid("form");

		const [ticket] = await db
			.update(ticketsTable)
			.set(updates)
			.where(eq(ticketsTable.id, id))
			.returning();

		if (!ticket) {
			throw new NotFoundError();
		}

		return c.json({ ticket });
	},
);

export { updateTicketRouter };
