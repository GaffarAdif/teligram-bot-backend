// controllers/telegramController.js
const axios = require('axios');
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const handleUpdate = async (req, res) => {
    const { message } = req.body;
    if (message) {
        const chatId = message.chat.id;
        const userId = message.from.id;
        const username = message.from.username;
        const firstName = message.from.first_name;

        console.log(`User ID: ${userId}, Username: ${username}, Name: ${firstName}`);

        // Send a response back to the user
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: chatId,
            text: `Hello ${firstName}! How can I assist you?`
        });
    }
    res.sendStatus(200);
};

module.exports = { handleUpdate };
