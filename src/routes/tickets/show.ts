import db from "@/db";
import { ticketsTable } from "@/db/schema/tickets";
import { NotFoundError } from "@/errors/not-found-error";
import { AppBindingsHono } from "@/lib/AppBindingsHono";
import { eq } from "drizzle-orm";

const showTicketsRouter = new AppBindingsHono();

showTicketsRouter.get("/tickets/:id{[0-9]+}", async (c) => {
	const ticketId = Number.parseInt(c.req.param("id"));
	const [ticket] = await db
		.select()
		.from(ticketsTable)
		.where(eq(ticketsTable.id, ticketId));
	if (!ticket) {
		throw new NotFoundError();
	}
	return c.json({ ticket });
});

export { showTicketsRouter };
