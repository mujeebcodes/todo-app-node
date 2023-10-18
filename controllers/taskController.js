const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.render("tasks", { tasks });
  } catch (error) {
    req.flash("error", "Failed to retrieve tasks.");
    res.redirect("/tasks");
  }
};

exports.createTask = async (req, res) => {
  const { title } = req.body;

  try {
    await Task.create({ title, user: req.userId });
    req.flash("success", "Task created successfully.");
    res.redirect("/tasks");
  } catch (error) {
    req.flash("error", "Failed to create task.");
    res.redirect("/tasks");
  }
};

exports.completeTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.findByIdAndUpdate(taskId, { state: "completed" });
    req.flash("success", "Task marked as completed.");
    res.redirect("/tasks");
  } catch (error) {
    req.flash("error", "Failed to complete task.");
    res.redirect("/tasks");
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.findByIdAndUpdate(taskId, { state: "deleted" });
    req.flash("success", "Task deleted.");
    res.redirect("/tasks");
  } catch (error) {
    req.flash("error", "Failed to delete task.");
    res.redirect("/tasks");
  }
};
