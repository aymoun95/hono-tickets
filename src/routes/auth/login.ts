import db from "@/db";
import { usersTable } from "@/db/schema/users";
import { BadRequestError } from "@/errors/bad-request-error";
import { env } from "@/lib/config";
import { Password } from "@/lib/password";
import { AppBindingsHono } from "@/lib/types";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { z } from "zod";

const loginRouter = new AppBindingsHono();

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

loginRouter.post("/login", zValidator("form", loginSchema), async (c) => {
	const { email, password } = c.req.valid("form");
	const [existingUser] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, email));

	if (!existingUser) {
		throw new BadRequestError("Invalid Credentials");
	}

	const passwordsMatch = await Password.compare(
		existingUser.password,
		password,
	);

	if (!passwordsMatch) {
		throw new BadRequestError("Invalid Credentials");
	}

	const userJwtPayload = {
		id: existingUser.id,
		email: existingUser.email,
		name: existingUser.name,
	};
	const userJwt = await sign(userJwtPayload, env.JWT_KEY);
	setCookie(c, "token", userJwt);

	return c.json({ user: userJwtPayload });
});

export { loginRouter };
