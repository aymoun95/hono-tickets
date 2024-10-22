# Tickets API

[![bun.sh](https://img.shields.io/badge/Bun-v1.x-black?style=flat&logo=bun&logoColor=white)](https://bun.sh)
[![Hono](https://img.shields.io/badge/Hono-v3.x-blue?style=flat&logo=hono)](https://hono.dev)
[![SQLite](https://img.shields.io/badge/SQLite-v3.x-darkblue?style=flat&logo=sqlite)](https://www.sqlite.org/)
[![Zod](https://img.shields.io/badge/Zod-v3.x-brightgreen?style=flat)](https://zod.dev/)
[![Drizzle](https://img.shields.io/badge/Drizzle-v0.x-orange)](https://orm.drizzle.team)
[![Biome](https://img.shields.io/badge/Biome-v1.x-purple)](https://biomejs.dev/)

## Project Overview

This is a **CRUD API** for managing tickets, built with the following technologies:

- **[Hono](https://hono.dev/)**: A fast, small web framework for Bun.
- **[Bun](https://bun.sh/)**: A super-fast JavaScript runtime.
- **[Drizzle ORM](https://orm.drizzle.team/)**: Lightweight SQL ORM to manage database operations.
- **[SQLite](https://www.sqlite.org/)**: A simple, file-based database system.
- **[Zod](https://zod.dev/)**: A TypeScript-first schema declaration and validation library.
- **[Biome](https://biomejs.dev/)**: A linter and formatter for keeping your code clean.

This API includes:

- Basic **CRUD** operations for ticket management (create, read, update, delete).
- User authentication using Cookies that includes JWT tokens.
- Input validation with **Zod** to ensure data integrity.

## Features

- **Authentication**: Users can sign up, log in, log out and authenticate with Cookies and JWT tokens.
- **Create Tickets**: Authenticated users can create new tickets.
- **Read Tickets**:All users can fetch details of specific tickets or list all available tickets.
- **Update Tickets**: Authenticated users can update existing tickets.
- **Delete Tickets**: Authenticated users can delete tickets.

## API Endpoints

### Authentication

- **POST** `/register`: Register a new user.
  - Payload: `{ "email": "string", "password": "string", "name": "string", "age": "number" }`
- **POST** `/login`: Log in with username and password.
  - Payload: `{ "email": "string", "password": "string" }`
- **POST** `/logout`: Log out a user.
- **GET** `/current-user`: Get details of the currently authenticated user (requires JWT token).

### Tickets

- **GET** `/tickets`: Get all tickets (authentication required).
- **GET** `/tickets/:id`: Get details of a specific ticket by its ID.
- **POST** `/admin/tickets`: Create a new ticket.
  - Payload: `{ "title": "string", "price": "number" }`
- **PUT** `/admin/tickets/:id`: Update a specific ticket.
  - Payload: `Partial<{ "title": "string", "price": "number" }>`
- **DELETE** `/admin/tickets/:id`: Delete a specific ticket.

If you have thunder client extension installed on vscode, you can import the file **thunder-collection_hono-tickets.json** with all the existing endpoints

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- for env vars once running the api, you will be prompted in the terminal about what you need to set.

### Setup

```bash
git clone https://github.com/your-username/tickets-api.git

cd tickets-api

bun install

create a dev.db file in the root

bun drizzle-kit push

create a .env file in the root

bun run dev
```
