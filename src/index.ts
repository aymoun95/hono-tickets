import { env } from "@/lib/config";
import { logger } from "hono/logger";
import { AppBindingsHono } from "./lib/AppBindingsHono";
import { currentUser } from "./middlewares/current-user";
import { errorHandler } from "./middlewares/error-handler";
import {
	currentUserRouter,
	loginRouter,
	logoutRouter,
	registerRouter,
} from "./routes/auth";
import {
	deleteTicketRouter,
	listTicketsRouter,
	newTicketRouter,
	showTicketsRouter,
	updateTicketRouter,
} from "./routes/tickets";

const app = new AppBindingsHono({ strict: false });

app.use(async (c, next) => {
	if (env.NODE_ENV !== "test") logger();
	await next();
});
app.use("/admin/*", currentUser);

const routes = [
	currentUserRouter,
	loginRouter,
	registerRouter,
	logoutRouter,
	listTicketsRouter,
	showTicketsRouter,
];
const protectedRoutes = [
	newTicketRouter,
	updateTicketRouter,
	deleteTicketRouter,
];

routes.forEach((route) => {
	app.route("/", route);
});

protectedRoutes.forEach((route) => {
	app.route("/admin", route);
});

app.onError(errorHandler);

app.notFound((c) => {
	console.log("NOT FOUND");
	return c.text("Not Found", 404);
});

export default app;
