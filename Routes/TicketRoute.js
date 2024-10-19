const express = require('express');
const Ticket = require('../Models/Ticket');
const WinnerList = require('../Models/LotteryWinnter'); // Assuming you have a WinnerList model
const cron = require('node-cron');

const router = express.Router();

// Buy a ticket
router.post('/buy', async (req, res) => {
  try {
    const { userId } = req.body;

    const ticketNumber = `QT${Math.floor(100000 + Math.random() * 900000)}`;

    const newTicket = new Ticket({
      userId: userId,
      ticketNumber: ticketNumber,
    });

    await newTicket.save();
    res.status(201).json({ message: 'Ticket purchased successfully', ticketNumber });
  } catch (error) {
    // Send error response without logging to the console
    res.status(500).json({ message: 'Error purchasing ticket', error: error.message });
  }
});

// Check ticket by user ID
router.get('/check-ticket/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const ticket = await Ticket.findOne({ userId });

    if (ticket) {
      return res.status(200).json({ hasTicket: true, ticketNumber: ticket.ticketNumber });
    } else {
      return res.status(200).json({ hasTicket: false });
    }
  } catch (error) {
    // Send error response without logging to the console
    res.status(500).json({ message: 'Error checking ticket', error: error.message });
  }
});


// Schedule task to select winners at 12 AM, 3 AM, 6 AM, 9 AM, 12 PM, 3 PM, 6 PM, and 9 PM

// evry two minute '*/2 * * * *'

// acctual 
 
cron.schedule('0 0,3,6,9,12,15,18,21 * * *', async () => { // Runs at specified hours
  try {
    // Delete old winners before saving new winners
    await WinnerList.deleteMany();

    const tickets = await Ticket.find();
    const totalTickets = tickets.length;

    const numberOfWinners = Math.max(1, Math.floor(totalTickets * 0.1)); // At least one winner

    if (totalTickets > 0) {
      // If tickets are available, select winners
      const shuffledTickets = tickets.sort(() => 0.5 - Math.random());
      const winners = shuffledTickets.slice(0, numberOfWinners);

      const winnerList = new WinnerList({
        winners: winners.map(ticket => ({
          userId: ticket.userId,
          ticketNumber: ticket.ticketNumber,
        })),
        date: new Date(),
      });

      await winnerList.save();

      // Delete all tickets after selection
      await Ticket.deleteMany();
    }
  } catch (error) {
    // Handle error (optional)
    // You can also handle logging here if needed
  }
});



// Controller to get the winner list
const getWinnerList = async (req, res) => {
  try {
    const winners = await WinnerList.find().sort({ date: -1 }); // Get all winners, sorted by date (most recent first)
    
    if (!winners || winners.length === 0) {
      return res.status(404).json({ message: 'No winners found' });
    }

    res.status(200).json(winners);
  } catch (error) {
    console.error('Error fetching winner list:', error);
    res.status(500).json({ message: 'Error fetching winner list', error: error.message });
  }
};

// Existing routes...

// Route to get winner list
router.get('/winners', getWinnerList); // Add this line to fetch winners
















module.exports = router;
