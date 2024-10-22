import { logger } from "hono/logger";
import "@/lib/config";
import { AppBindingsHono } from "./lib/types";
import { currentUser } from "./middlewares/current-user";
import { errorHandler } from "./middlewares/error-handler";
import {
	currentUserRouter,
	loginRouter,
	logoutRouter,
	registerRouter,
} from "./routes/auth";

const app = new AppBindingsHono({ strict: false });

app.use(logger());
app.use("/admin/*", currentUser);

const routes = [currentUserRouter, loginRouter, registerRouter, logoutRouter];
const protectedRoutes: AppBindingsHono[] = [];

routes.forEach((route) => {
	app.route("/", route);
});

protectedRoutes.forEach((route) => {
	app.route("/admin", route);
});

app.onError(errorHandler);

app.notFound((c) => {
	return c.text("Not Found", 404);
});

export default app;
