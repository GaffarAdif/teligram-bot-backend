const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
  winners: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // assuming you have a User model
      ticketNumber: { type: String, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
});

const WinnerList = mongoose.model('WinnerList', winnerSchema);

module.exports = WinnerList;
