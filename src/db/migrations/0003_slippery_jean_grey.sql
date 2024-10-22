PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tickets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`price` real NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`price`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_tickets`("id", "title", "price", "user_id", "created_at", "updated_at") SELECT "id", "title", "price", "user_id", "created_at", "updated_at" FROM `tickets`;--> statement-breakpoint
DROP TABLE `tickets`;--> statement-breakpoint
ALTER TABLE `__new_tickets` RENAME TO `tickets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;