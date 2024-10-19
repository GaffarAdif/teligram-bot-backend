const express = require('express');
const Ticket = require('../Models/Ticket');
const router = express.Router();

// Buy a ticket
router.post('/buy', async (req, res) => {
  try {
    // Extract userId from the request body
    const { userId } = req.body;

    // Generate a unique ticket number
    const ticketNumber = `QT${Math.floor(100000 + Math.random() * 900000)}`;

    // Create a new ticket with the userId
    const newTicket = new Ticket({
      userId: userId, // Save the userId with the ticket
      ticketNumber: ticketNumber,
    });

    // Save the new ticket to the database
    await newTicket.save();
    res.status(201).json({ message: 'Ticket purchased successfully', ticketNumber });
  } catch (error) {
    console.error('Error purchasing ticket:', error);
    res.status(500).json({ message: 'Error purchasing ticket' });
  }
});

// In your ticket route file
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
      console.error('Error checking ticket:', error);
      res.status(500).json({ message: 'Error checking ticket' });
    }
  });
  

module.exports = router;
