import db from "@/db";
import {
	insertUserSchema,
	usersTable,
	usersWithExcludedPassword,
} from "@/db/schema/users";
import { BadRequestError } from "@/errors/bad-request-error";
import { AppBindingsHono } from "@/lib/AppBindingsHono";
import { env } from "@/lib/config";
import { Password } from "@/lib/password";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";

const registerRouter = new AppBindingsHono();

registerRouter.post(
	"/register",
	zValidator("form", insertUserSchema),
	async (c) => {
		const { email, password, age, name } = c.req.valid("form");

		const [existingUser] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email));

		if (existingUser) {
			throw new BadRequestError("Email in use");
		}
		const hashedPassword = await Password.toHash(password);

		const [savedUser] = await db
			.insert(usersTable)
			.values({ email, password: hashedPassword, age, name })
			.returning({ ...usersWithExcludedPassword });

		const userJwtPayload = {
			id: savedUser.id,
			email: savedUser.email,
			name: savedUser.name,
		};
		const userJwt = await sign(userJwtPayload, env.JWT_KEY);
		setCookie(c, "token", userJwt);

		return c.json({ user: userJwtPayload });
	},
);

export { registerRouter };
