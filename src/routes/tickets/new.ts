import db from "@/db";
import { insertTicketsSchema, ticketsTable } from "@/db/schema/tickets";
import { AppBindingsHono } from "@/lib/AppBindingsHono";
import { requireAuth } from "@/middlewares/require-auth";
import { zValidator } from "@hono/zod-validator";

const newTicketRouter = new AppBindingsHono();

newTicketRouter.post(
	"/tickets",
	requireAuth,
	zValidator("form", insertTicketsSchema),
	async (c) => {
		const { title, price, userId } = c.req.valid("form");

		const [ticket] = await db
			.insert(ticketsTable)
			.values({ title, price, userId })
			.returning();

		return c.json({ ticket });
	},
);

export { newTicketRouter };
