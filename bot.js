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
                        url: 'https://t.me/adifdemobot_bot/adufadfkhdf'
                    }
                ],
                [
                    {
                        text: 'Join Our Community',
                        url: 'https://t.me/adifdemobot_bot/community'
                    }
                ]
            ]
        }
    };
};

// Function to start the bot and return userId via a promise
const startBot = () => {
    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

    // Return a promise that resolves when the /start command is received
    return new Promise((resolve, reject) => {
        bot.start((ctx) => {
            const username = ctx.from.username || ctx.from.first_name;
            const userId = ctx.from.id;

            console.log(`User started the bot: ID = ${userId}, Username = ${username}`);

            ctx.reply(
                createMainMenu()
            );

            // Resolve the promise with the userId
            resolve(userId);
        });

        bot.catch((err) => {
            console.error('Error occurred:', err);
            reject(err); // Reject the promise in case of an error
        });

        bot.launch().then(() => {
            console.log('Bot is running...');
        }).catch((err) => {
            console.error('Failed to launch bot:', err);
            reject(err); // Reject the promise if bot fails to launch
        });
    });
};

// Export the startBot function
module.exports = {
    startBot
};
