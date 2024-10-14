const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); // Correct way to import dotenv
const cors = require('cors'); // Import cors package
const telegramRoutes = require('./Routes/teligramRoute');
const errorHandler = require('./MIddleware/errorMiddleware');
const { startBot } = require('./bot'); // Import the startBot function

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Use CORS to accept requests from all origins
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json());
app.use('/telegram', telegramRoutes); // Telegram routes

// Error handling middleware
app.use(errorHandler);

// Start the Telegram bot and log the userId when received
startBot()
    .then((userId) => {
        console.log(`User ID received: ${userId}`);
    })
    .catch((error) => {
        console.error('Error starting Telegram bot:', error);
    });

// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
