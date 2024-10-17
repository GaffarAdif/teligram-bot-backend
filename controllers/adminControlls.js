const AdminKeyword = require('../Models/admin'); // Import the model


// Function to create a new admin keyword
const createAdminKeyword = async (req, res) => {
  const { keyword } = req.body; // Extract keyword from the request body

  try {
    // Check if the keyword already exists
    const existingKeyword = await AdminKeyword.findOne({ keyword });
    if (existingKeyword) {
      return res.status(400).json({ message: 'Keyword already exists' });
    }

    // Create a new admin keyword
    const newAdminKeyword = new AdminKeyword({ keyword });

    // Save the new keyword to the database
    await newAdminKeyword.save();

    res.status(201).json({ message: 'Admin keyword created successfully', keyword: newAdminKeyword });

  } catch (err) {
    // Handle server error
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Handle admin login with keyword
const adminLogin = async (req, res) => {
  const { keyword } = req.body;

  try {
    // Check if the keyword matches any in the database
    const admin = await AdminKeyword.findOne({ keyword });
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid keyword' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};






module.exports = { adminLogin,createAdminKeyword };
