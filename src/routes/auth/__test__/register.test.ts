import { describe, expect, test } from "bun:test";
import app from "@/index";
import { createFormData, defaultFormData } from "@/test/helper";

describe("register route", () => {
	test("returns a 201 on successful signup", async () => {
		const res = await app.request("/register", {
			method: "POST",
			body: createFormData(),
		});

		expect(res.status).toEqual(201);
	});

	test("returns a 400 with an invalid email", async () => {
		const res = await app.request("/register", {
			method: "POST",
			body: createFormData({ ...defaultFormData, email: "invalidEmail" }),
		});

		expect(res.status).toEqual(400);
	});

	test("returns a 400 with an invalid password", async () => {
		const res = await app.request("/register", {
			method: "POST",
			body: createFormData({ ...defaultFormData, password: "p" }),
		});

		expect(res.status).toEqual(400);
	});

	test("disallows duplicate emails", async () => {
		await app.request("/register", {
			method: "POST",
			body: createFormData({ ...defaultFormData, password: "p" }),
		});

		const res = await app.request("/register", {
			method: "POST",
			body: createFormData({ ...defaultFormData, password: "p" }),
		});

		expect(res.status).toEqual(400);
	});

	test("sets a cookie after successful signup", async () => {
		const res = await app.request("/register", {
			method: "POST",
			body: createFormData(),
		});

		expect(res.headers.get("Set-Cookie")).not.toBeNull();
	});
});
