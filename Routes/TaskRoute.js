const express = require('express');
const router = express.Router();
const { createTask,getAllTasks ,deleteTask } = require('../controllers/TaskControllers'); // Import the controller functions

// Handle GET requests to /user/:id for retrieving user data
router.post('/create', createTask); // Use the controller function for retrieving user data
router.get('/', getAllTasks); //use the controller 
router.delete('/:id',deleteTask)


module.exports = router;
