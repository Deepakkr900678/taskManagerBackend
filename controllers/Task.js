const TaskModel = require("../models/Task");
require("dotenv").config();

exports.createTask = async (req, res) => {
  try {
    const { title, description} = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingTask = await TaskModel.findOne({ title });

    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: "Task already exists with this title",
      });
    }

    const task = new TaskModel({
      title,
      description,
    });
    await task.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create Task. Please try again.",
    });
  }
};

exports.getAllTasks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalTasks = await TaskModel.countDocuments();
    const totalPages = Math.ceil(totalTasks / limit);
    const offset = (page - 1) * limit;

    const tasks = await TaskModel.find().skip(offset).limit(limit);

    return res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
      currentPage: page,
      totalPages,
      totalTasks
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks. Please try again.",
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve Task. Please try again.",
    });
  }
};

exports.updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await TaskModel.findByIdAndUpdate(id, updates, { new: true });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update Task. Please try again.",
    });
  }
};

exports.deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete Task. Please try again.",
    });
  }
};
