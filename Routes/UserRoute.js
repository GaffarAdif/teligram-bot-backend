// UserRoute.js
const express = require('express');
const router = express.Router();

// Mock user data (replace this with your database logic)

// Handle GET requests to /user/:id
router.get('/:id', (req, res) => {
    const { id } = req.params; // Access params directly

    if (id) {
        res.status(200).json({id}); // Send the user data back
    } else {
        res.status(404).json({ message: "User not found" }); // User not found response
    }
});

// Handle POST requests to /user/:id (optional)
router.post('/:id', (req, res) => {
    const { id } = req.params; // Access params directly
    console.log(id); // Log the ID

    res.status(200).json({ message: `Received ID: ${id}` }); // Send a response back
});

module.exports = router;
