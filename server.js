const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

tasks = [
  {id: 1, title: "Task 1", done: true},
  {id: 2, title: "Task 2", done: true},
  {id: 3, title: "Task 3", done: true}
]

app.get('/', (req, res) => {
  res.json({ "name": "Task API", 
    "version": "1.0", 
    "endpoints": ["/tasks"] });
});

app.get('/health', (req, res) => {
  res.json({ "status": "OK" });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) =>{
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task){
    return res.status(404).json({ error: "Task ${id} not found" });
  }

  res.json(task);
});

app.post('/tasks', (req, res) => {
  const title = req.body.title

  if (!title){
    return res.status(400).json({error: "Missing Title"});
  }

  let new_id = tasks.length + 1;

  tasks.push({ "id": new_id,
    "title": "Buy milk",
    done: false
  })

  res.status(201).json({ "id": new_id,
    "title": title,
    done: false
  });
});

app.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  const title = req.body.title;
  const done = req.body.done;

  if (!task){
    return res.status(404).json({error: "Unknown id"});
  }

  if (!title && done === undefined){
    return res.status(400).json({error: "Empty/Invalid body"})
  }

  if (title !== undefined){
    task.title = title;
  }

  if (done !== undefined){
    task.done = done;
  }

  res.json(task)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});