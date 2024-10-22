import { NotAuthorizedError } from "@/errors/not-authorized-error";
import type { AppBindings } from "@/lib/types";
import { createMiddleware } from "hono/factory";

export const requireAuth = createMiddleware<AppBindings>(async (c, next) => {
	const user = c.get("user");

	if (!user) {
		throw new NotAuthorizedError();
	}

	next();
});
