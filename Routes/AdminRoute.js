const express = require('express');
const router = express.Router();
const { adminLogin,createAdminKeyword } = require('../controllers/adminControlls'); // Import the controller functions

// Handle GET requests to /user/:id for retrieving user data
router.get('/create', createAdminKeyword); // Use the controller function for retrieving user data
router.put('/login', adminLogin); //use the controller 


module.exports = router;
