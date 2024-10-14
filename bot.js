// bot.js
const { Telegraf } = require('telegraf');
require('dotenv').config(); // Load environment variables from .env file

// Function to create the reply markup with buttons
const createMainMenu = () => {
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Open My Bot Functionality',
                        url: 'https://t.me/adifdemobot_bot/adufadfkhdf' // Link to start a specific command or action in the bot
                    }
                ],
                [
                    {
                        text: 'Join Our Community',
                        url: 'https://t.me/adifdemobot_bot/community' // Example link; replace with actual community functionality if applicable
                    }
                ]
            ]
        }
    };
};

// Function to start the bot
const startBot = () => {
    // Initialize the bot with the token from the .env file
    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

    // Listen for the /start command
    bot.start((ctx) => {
        const username = ctx.from.username || ctx.from.first_name; // Get username or first name if not set
        const userId = ctx.from.id; // Get the user's Telegram ID

        // Log the user ID and username
        console.log(`User started the bot: ID = ${userId}, Username = ${username}`);

        ctx.reply(
            `Welcome to my bot, ${username}! Click a button below to take action:`,
            createMainMenu()
        );
    });

    // Handle errors
    bot.catch((err) => {
        console.error('Error occurred:', err);
    });

    // Launch the bot
    bot.launch().then(() => {
        console.log('Bot is running...');
    }).catch((err) => {
        console.error('Failed to launch bot:', err);
    });
};

// Export the startBot function
module.exports = {
    startBot
};
