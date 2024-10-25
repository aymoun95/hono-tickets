import { describe, expect, test } from "bun:test";
import app from "@/index";
import { createFormData } from "@/test/helper";

describe("logout route", () => {
	test("clears the cookie after signing out", async () => {
		const res = await app.request("/register", {
			method: "POST",
			body: createFormData(),
		});

		expect(res.status).toEqual(201);

		const resLogout = await app.request("/logout", {
			method: "POST",
			body: createFormData(),
		});

		expect(resLogout.headers.get("Set-Cookie")).toEqual(
			"token=; Max-Age=0; Path=/",
		);
	});
});
