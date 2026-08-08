const express = require('express');
const app = express();
const port = 3000;

tasks = [
  {id: 1, title: "Task 1", description: "This is task 1"},
  {id: 2, title: "Task 2", description: "This is task 2"},
  {id: 3, title: "Task 3", description: "This is task 3"}
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});