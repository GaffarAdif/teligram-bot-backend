// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); // Correct way to import dotenv
const cors = require('cors'); // Import cors package
const telegramRoutes = require('./Routes/teligramRoute');
const errorHandler = require('./MIddleware/errorMiddleware');
const axios = require('axios');
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

// Set up Telegram webhook
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setWebhook?url=https://t.me/adifdemobot_bot/adufadfkhdf`);
        res.send(response.data);
        console.log('Teligram info', response.data);
    } catch (error) {
        console.error('Error setting webhook:', error);
        res.status(500).send('Failed to set webhook');
    }
});

// Start the Telegram bot and listen for incoming requests
app.listen(port, () => {
    startBot(); // Start the Telegram bot
    console.log(`Server running at http://localhost:${port}`);
});
