const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: [true, 'Please add a UserId'],
  },
  name: { // New field for the user's name
    type: String,
  },
  Balance: {
    type: Number,
    default: 0, // Set default balance to 0
  },
  TaskCompleteId: {
    type: [String], // Array of Task IDs (can be adjusted based on your Task ID type)
    default: [], // Default to an empty array
  },
  WalletAddress: {
    type: String,
  },
  N: {
    type: String,
  },
  newUser: { // New field to indicate if the user is new
    type: Boolean,
    default: true, // Default to true if the user is new
  },
  referCode: { // New field for unique referral code
    type: String,
    unique: true, // Ensure the code is unique for each user
    required: true, // Required field
  },
  referredBy: { // Optional field to store the ID or referral code of the referer
    type: String, 
    default: null, // Can be null if the user wasn't referred
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model from the schema and export it
const User = mongoose.model('User', userSchema);
module.exports = User;
