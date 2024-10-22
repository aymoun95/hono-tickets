import db from "@/db";
import { ticketsTable } from "@/db/schema/tickets";
import { NotFoundError } from "@/errors/not-found-error";
import { AppBindingsHono } from "@/lib/types";
import { requireAuth } from "@/middlewares/require-auth";
import { eq } from "drizzle-orm";

const deleteTicketRouter = new AppBindingsHono();

deleteTicketRouter.delete("/tickets/:id{[0-9]+}", requireAuth, async (c) => {
	const id = Number.parseInt(c.req.param("id"));

	const [ticket] = await db
		.delete(ticketsTable)
		.where(eq(ticketsTable.id, id))
		.returning();

	if (!ticket) {
		throw new NotFoundError();
	}

	return c.json({});
});

export { deleteTicketRouter };
