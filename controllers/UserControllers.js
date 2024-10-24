const { customAlphabet } = require('nanoid');
const User = require('../Models/User');

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6); // A 6-character alphanumeric code

// Get user details by UserId
// Get user details by UserId
const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tguser  = req.body.TeligramUser; // Assuming referral code is passed in the request body

    console.log(tguser);
    // Check if the user exists
    let user = await User.findOne({ UserId: userId });

    if (user) {
      // If user exists, return the user details including _id
      return res.status(200).json({
        _id: user._id, // Include the MongoDB _id
        UserId: user.UserId,
        Balance: user.Balance,
        TaskCompleteId: user.TaskCompleteId,
        WalletAddress: user.WalletAddress,
        NewUser: user.newUser,
        LoginDay: user.createdAt,
        referCode: user.referCode, // Return the user's referral code
        referredBy: user.referredBy, // Return who referred the user (if applicable)
      });
    } else {
      // Generate a unique referral code for the new user
      let referCode;
      let existingCode;
      do {
        referCode = nanoid(); // Generate a random referral code
        existingCode = await User.findOne({ referCode }); // Check if the code already exists
      } while (existingCode); // Keep generating until a unique code is found

      // If the user does not exist, create a new user
      user = new User({
        UserId: userId,
        Balance: 0,
        TaskCompleteId: [],
        WalletAddress: '',
        newUser: true,
        referCode: referCode, // Set the unique referral code
        referredBy: referredByCode || null, // Set the referral code of the referer, if provided
      });

      // Save the new user to the database
      await user.save();
      return res.status(201).json({
        message: 'User created successfully',
        _id: user._id, // Include the MongoDB _id
        UserId: user.UserId,
        Balance: user.Balance,
        TaskCompleteId: user.TaskCompleteId,
        WalletAddress: user.WalletAddress,
        NewUser: user.newUser,
        LoginDay: user.createdAt,
        referCode: user.referCode, // Return the newly generated referral code
        referredBy: user.referredBy, // Return the referer (if applicable)
      });
    }
  } catch (error) {
    console.error('Error fetching or creating user:', error); // Log the error
    res.status(500).json({ message: 'Server error', error });
  }
};


const updateStatue = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Update the user's newUser field to false
      const updatedUser = await User.findOneAndUpdate(
        { UserId: userId },   // Filter to find the user by UserId
        { newUser: false },   // Update the newUser field to false
        { new: true }         // Return the updated user document
      );
  
      if (!updatedUser) {
        // If the user does not exist, respond with a 404 error
        return res.status(404).json({ message: 'User not found' });
      }
  
  
      // Respond with the updated user details
      return res.status(200).json({
        message: 'User status updated successfully',
      });
    } catch (error) {
      console.error('Error updating user status:', error); // Log the error to the console
      res.status(500).json({ message: 'Server error', error });
    }
  };

// get all user 
// Get all users sorted by balance (highest to lowest)
const getUserRank = async (req, res) => {
  try {
    // Find all users and sort them by Balance in descending order
    const allUsers = await User.find().sort({ Balance: -1 }); // Sort by Balance: -1 for descending order

    if (!allUsers || allUsers.length === 0) {
      // If no users are found, respond with a 404 error
      return res.status(404).json({ message: 'No users found' });
    }

    // Respond with the sorted user details
    return res.status(200).json({
      allUsers, // Return the list of all users sorted by Balance
    });
  } catch (error) {
    console.error('Error fetching user ranks:', error); // Log the error to the console
    res.status(500).json({ message: 'Server error', error });
  }
};


// Update user details
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the userId from request parameters
    const updates = req.body; // Get the updates from the request body
    const {Balance,TaskCompleteId,referCode,referredBy,name,WalletAddress} = updates.updates

    // Find the user by UserId and update with the new values
    const updatedUser = await User.findOneAndUpdate(
      { UserId: userId },
      {
        Balance,
        TaskCompleteId,
        referCode,
        referredBy,
        name,
        WalletAddress 
       }, // Pass the updates directly to the query
      { new: true, runValidators: true } // Return the updated user and run validation
    );

    if (!updatedUser) {
      // If the user does not exist, respond with a 404 error
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the updated user details
    return res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error); // Log the error to the console
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getUser,
  updateStatue,
  getUserRank,
  updateUser, // Export the new updateUser controller
};