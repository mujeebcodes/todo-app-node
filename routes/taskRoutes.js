const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.get("/:id/complete", taskController.completeTask);
router.get("/:id/delete", taskController.deleteTask);

module.exports = router;
