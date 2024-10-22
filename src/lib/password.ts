export class Password {
	static async toHash(password: string) {
		return Bun.password.hash(password);
	}

	static compare(storedPassword: string, suppliedPassword: string) {
		return Bun.password.verify(suppliedPassword, storedPassword);
	}
}
