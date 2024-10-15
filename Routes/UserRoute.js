const express = require('express');
const router = express.Router();
const { getUser,updateStatue } = require('../controllers/UserControllers'); // Import the controller functions

// Handle GET requests to /user/:id for retrieving user data
router.get('/:userId', getUser); // Use the controller function for retrieving user data
router.put('/update-Status/:userId', updateStatue); //use the controller 


module.exports = router;
