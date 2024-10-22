import { Hono } from "hono";
import type { AppBindings } from "./types";

export class AppBindingsHono extends Hono<AppBindings> {}
