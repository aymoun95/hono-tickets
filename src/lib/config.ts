import { z } from "zod";

import type { ZodError } from "zod";

const EnvSchema = z.object({
	NODE_ENV: z.string().default("default"),
	JWT_KEY: z.string(),
	DB_FILE_NAME: z.string(),
});

let env: z.infer<typeof EnvSchema>;

try {
	// biome-ignore lint/nursery/noProcessEnv: we use it here so we can parse it
	env = EnvSchema.parse(process.env);
} catch (e) {
	const error = e as ZodError;

	console.error(error.flatten().fieldErrors);
	process.exit(1);
}

export { env };
