# Task API

A small CRUD API built with Node.js and Express that manages a to-do list — create, read, update, and delete tasks. Data is stored in memory (no database), so it resets whenever the server restarts.

## How to install & run

```bash
npm install
node server.js
```

The server starts on `http://localhost:3000`.

Interactive API docs (Swagger UI) are available at `http://localhost:3000/docs`.

## Endpoints

| Method | Path          | Description                          |
|--------|---------------|---------------------------------------|
| GET    | `/`           | API info (name, version, endpoints)   |
| GET    | `/health`     | Health check — confirms server is up  |
| GET    | `/tasks`      | List all tasks                        |
| GET    | `/tasks/:id`  | Get a single task by id               |
| POST   | `/tasks`      | Create a new task                     |
| PUT    | `/tasks/:id`  | Update a task's title and/or done     |
| DELETE | `/tasks/:id`  | Delete a task                         |

### Status codes used

- `200` — successful read/update
- `201` — task created
- `204` — task deleted (no content returned)
- `400` — invalid or missing input (e.g. empty title)
- `404` — task not found

## Example request

```bash
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Buy milk"}'
```

```
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 40
ETag: W/"28-PpSBYV7i68cXyGc7AhjVpkZkY5Q"
Date: Sun, 09 Aug 2026 01:32:31 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":4,"title":"Buy milk","done":false}%  
```

## Swagger UI

![Swagger UI](docs/swagger-screenshot.png)