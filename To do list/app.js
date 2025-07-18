const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let tasks = [];
let counter = 1;

app.get("/", (req, res) => {
  res.render("index", { tasks });
});

app.post("/add", (req, res) => {
  const text = req.body.task?.trim();
  if (text) {
    tasks.push({ id: counter++, text });
  }
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (!task) return res.redirect("/");
  res.render("edit", { task });
});

app.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const text = req.body.task?.trim();
  const task = tasks.find((task) => task.id === id);
  if (task && text) task.text = text;
  res.redirect("/");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
