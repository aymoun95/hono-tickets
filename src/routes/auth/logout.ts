import { AppBindingsHono } from "@/lib/AppBindingsHono";
import { deleteCookie } from "hono/cookie";

const logoutRouter = new AppBindingsHono();

logoutRouter.post("/logout", async (c) => {
	deleteCookie(c, "token");
	return c.json({});
});

export { logoutRouter };
