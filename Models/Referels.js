const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referCode: {
    type: String,
    required: true,
    unique: true 
  },
  referer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  referral: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
