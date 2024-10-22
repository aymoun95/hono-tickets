import db from "@/db";
import { ticketsTable } from "@/db/schema/tickets";
import { AppBindingsHono } from "@/lib/AppBindingsHono";

const listTicketsRouter = new AppBindingsHono();

listTicketsRouter.get("/tickets", async (c) => {
	const tickets = await db.select().from(ticketsTable);
	return c.json({ tickets });
});

export { listTicketsRouter };
