const Task = require('../Models/Task'); // Assuming the Task model is in a models directory

// Create a new Task
const createTask = async (req, res) => {
  try {
    const { type, name, instructions, link, points, keyword } = req.body;

    // Create a new Task instance
    const newTask = new Task({
      type,
      name,
      instructions,
      link,
      points,
      keyword,
    });

    // Save the Task to the database
    const savedTask = await newTask.save();

    // Respond with the newly created Task
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error); // Log the error
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    // Find all tasks from the database
    const tasks = await Task.find();

    // Respond with the tasks
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Delete a Task by ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(id);

    // If the task wasn't found, respond with a 404
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Task deleted successfully', deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error); // Log the error
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  deleteTask, // Add deleteTask to exports
};