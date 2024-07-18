const express = require("express")
const router = express.Router()

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/Task")

router.post("/createTask", createTask)
router.get("/getAllTasks", getAllTasks)
router.get("/getTaskById/:id", getTaskById)
router.patch("/updateTaskById/:id", updateTaskById)
router.delete("/deleteTaskById/:id", deleteTaskById)

module.exports = router
