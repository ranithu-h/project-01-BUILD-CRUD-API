# Todo List API

A simple in-memory CRUD API for a todo list, built with Express.js.

## Data model

Each task is stored in memory (a plain array, no database) as:

```json
{ "id": 1, "title": "Buy milk", "done": false }
```

## Run it

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`.
Swagger UI docs run at `http://localhost:3000/doc` (spec source: `doc/openapi.json`).

## Endpoints

| Method | Path        | Description                          | Success | Errors |
|--------|-------------|---------------------------------------|---------|--------|
| GET    | `/task`     | List all tasks                        | 200     | -      |
| GET    | `/task/:id` | Get one task                          | 200     | 404 if id not found |
| POST   | `/task`     | Create a task (`{ "title": "..." }`, `done` starts `false`) | 201 | 400 if title missing/empty |
| PUT    | `/task/:id` | Replace a task's `title` and `done`   | 201     | 400 if body invalid/empty, 404 if id not found |
| DELETE | `/task/:id` | Delete a task                         | 204     | 404 if id not found |

## Example requests

```bash
curl http://localhost:3000/task

curl -X POST http://localhost:3000/task \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk"}'

curl -X PUT http://localhost:3000/task/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk and eggs","done":true}'

curl -X DELETE http://localhost:3000/task/1
```
