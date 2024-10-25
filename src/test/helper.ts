import { expect } from "bun:test";
import app from "..";

type formKeys = "email" | "password" | "age" | "name";
type TFormData = {
	[key in formKeys]: string;
};

export const defaultFormData = {
	email: "test@test.com",
	password: "test1234",
	age: "18",
	name: "test",
};
export const createFormData = (form: TFormData = defaultFormData) => {
	const formData = new FormData();
	formData.append("email", form.email);
	formData.append("password", form.password);
	formData.append("age", form.age);
	formData.append("name", form.name);

	return formData;
};

export const signin = async () => {
	const response = await app.request("/register", {
		method: "POST",
		body: createFormData(),
	});

	expect(response.status).toBe(201);

	const cookie = response.headers.get("Set-Cookie");

	return cookie;
};
