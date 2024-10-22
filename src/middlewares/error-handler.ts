import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (err: Error, c: Context) => {
	if (err instanceof CustomError) {
		return c.json(
			{ errors: err.serializeErrors() },
			err.statusCode as StatusCode,
		);
	}

	console.error(err);

	return c.json({ errors: [{ message: "Something went wrong!!!!" }] }, 400);
};
