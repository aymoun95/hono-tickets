import { env } from "@/lib/config";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const currentUser = createMiddleware(async (c, next) => {
	try {
		const cookie = getCookie(c, "token");

		if (!cookie) {
			return next();
		}
		const decodedPayload = await verify(cookie, env.JWT_KEY);

		c.set("user", decodedPayload);
	} catch (error) {}
	next();
});
