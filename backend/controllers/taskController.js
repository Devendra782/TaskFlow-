const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE STATUS
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

// if (!task) {
//   return res.status(404).json({
//     message: "Task not found",
//   });
// }

// if (task.user.toString() !== req.user._id.toString()) {
//   return res.status(401).json({
//     message: "Not authorized",
//   });
// }

// await task.deleteOne();

    task.status =
      task.status === "Pending"
        ? "Completed"
        : "Pending";

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStats = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    });

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
      (task) => task.status === "Pending"
    ).length;

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  getStats,
};