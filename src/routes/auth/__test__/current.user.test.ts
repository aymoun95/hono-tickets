import { describe, expect, test } from "bun:test";
import app from "@/index";
import { createFormData, signin } from "@/test/helper";

describe("current user", () => {
	test("responds with details about the current user", async () => {
		const cookie = await signin();
		const res = await app.request("/current-user", {
			method: "GET",
			body: createFormData(),
			// biome-ignore lint/style/noNonNullAssertion: because we asserted the cookie in signin helper function
			headers: new Headers({ Cookie: cookie! }),
		});
		const response = await res.json();

		console.log("response", response);
		expect(response.currentUser.email).toEqual("test@test.com");
	});

	test("responds with null if not authenticated", async () => {
		const res = await app.request("/current-user", {
			method: "GET",
			body: createFormData(),
		});
		const response = await res.json();

		expect(response.currentUser).toBeNull();
	});
});
