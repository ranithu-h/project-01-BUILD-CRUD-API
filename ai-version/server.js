const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ---- In-memory data store ----
let tasks = [];
let nextId = 1;

// ---- Swagger UI ----
const openapiPath = path.join(__dirname, 'doc', 'openapi.json');
const openapiDocument = JSON.parse(fs.readFileSync(openapiPath, 'utf-8'));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(openapiDocument));

// ---- Helpers ----
function findTaskIndex(id) {
  return tasks.findIndex((t) => t.id === id);
}

// ---- Routes ----

// GET /task - list all tasks
app.get('/task', (req, res) => {
  res.status(200).json(tasks);
});

// GET /task/:id - get a specific task
app.get('/task/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task with id ${id} not found` });
  }

  res.status(200).json(task);
});

// POST /task - create a new task
app.post('/task', (req, res) => {
  const { title } = req.body || {};

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and cannot be empty' });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    done: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /task/:id - replace title and done status
app.put('/task/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, done } = req.body || {};

  if (
    !title ||
    typeof title !== 'string' ||
    title.trim() === '' ||
    typeof done !== 'boolean'
  ) {
    return res.status(400).json({
      error: 'Invalid body: "title" (non-empty string) and "done" (boolean) are required',
    });
  }

  const index = findTaskIndex(id);
  if (index === -1) {
    return res.status(404).json({ error: `Task with id ${id} not found` });
  }

  tasks[index] = { id, title: title.trim(), done };
  res.status(201).json(tasks[index]);
});

// DELETE /task/:id - remove a task
app.delete('/task/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = findTaskIndex(id);

  if (index === -1) {
    return res.status(404).json({ error: `Task with id ${id} not found` });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Todo API listening on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/doc`);
});

module.exports = app;
