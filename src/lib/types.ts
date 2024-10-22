import { Hono } from "hono";

export interface AppBindings {
	Variables: {
		user?: object;
	};
}

export class AppBindingsHono extends Hono<AppBindings> {}
