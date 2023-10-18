const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  state: {
    type: String,
    enum: ["pending", "completed", "deleted"],
    default: "pending",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Task", taskSchema);
