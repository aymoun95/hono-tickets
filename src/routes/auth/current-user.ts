import { AppBindingsHono } from "@/lib/types";
import { currentUser } from "@/middlewares/current-user";

const currentUserRouter = new AppBindingsHono();

currentUserRouter.get("/current-user", currentUser, async (c) => {
	return c.json({ currentUser: c.get("user") ?? null });
});

export { currentUserRouter };
