const User = require('../Models/User');

// Get user details by UserId
const getUser = async (req, res) => {
  try {
    // Log the userId parameter to the console
    const userId = req.params.userId;
    console.log('UserId:', userId); // Log the userId to the console

    // Check if the user exists
    let user = await User.findOne({ UserId: userId });

    if (user) {
      await user.save(); // Save the updates to the user document

      console.log('User found:', user); // Log the found user
      return res.status(200).json({
        UserId: user.UserId,
        Balance: user.Balance,
        TaskCompleteId: user.TaskCompleteId,
        WalletAddress: user.WalletAddress,
        NewUser: user.newUser, // Reflect the actual newUser status
        LoginDay: user.createdAt, 
      });
    } else {
      // If the user does not exist, create a new user
      user = new User({
        UserId: userId,
        Balance: 0, // Initialize with a default balance
        TaskCompleteId: [], // Initialize with an empty array
        WalletAddress: '', // Initialize with an empty wallet address
        newUser: true, // Set newUser to true for a new user
      });

      // Save the new user to the database
      await user.save();

      // Respond with the newly created user details
      console.log('New user created:', user); // Log the newly created user
      return res.status(201).json({
        message: 'User created successfully',
        UserId: user.UserId,
        Balance: user.Balance,
        TaskCompleteId: user.TaskCompleteId,
        WalletAddress: user.WalletAddress,
        NewUser: user.newUser, // Reflect the actual newUser status
        LoginDay: user.createdAt, 
      });
    }
  } catch (error) {
    console.error('Error fetching or creating user:', error); // Log the error to the console
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
  
  module.exports = {
    updateStatue,
  };
  
module.exports = {
  getUser,
  updateStatue
};
