import { describe, expect, test } from "bun:test";
import app from "@/index";
import { createFormData, defaultFormData } from "@/test/helper";

describe("login route", () => {
	test("fails when a email that does not exist is supplied", async () => {
		const res = await app.request("/login", {
			method: "POST",
			body: createFormData(),
		});
		const response = await res.json();
		expect(res.status).toBe(400);
		expect(response.errors).toBeArray();
	});

	test("fails when an incorrect password is supplied", async () => {
		await app.request("/register", {
			method: "POST",
			body: createFormData(),
		});

		const res = await app.request("/login", {
			method: "POST",
			body: createFormData({ ...defaultFormData, password: "test123" }),
		});

		expect(res.status).toBe(400);
	});

	test("responds with a cookie when given valid credentials", async () => {
		await app.request("/register", {
			method: "POST",
			body: createFormData(),
		});

		const res = await app.request("/login", {
			method: "POST",
			body: createFormData(),
		});

		expect(res.headers.get("Set-Cookie")).not.toBeNull();
	});
});
