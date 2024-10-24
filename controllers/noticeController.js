const Notice = require('../Models/Notice'); // Adjust the path as necessary

// Add Notice
const addNotice = async (req, res) => {
  try {
    const { notice } = req.body;

    // Validate that notice content is provided
    if (!notice) {
      return res.status(400).json({ message: 'Notice content is required' });
    }

    // Create a new notice
    const newNotice = new Notice({ notice });

    // Save the notice to the database
    await newNotice.save();

    // Respond with the created notice, including its ID
    res.status(201).json({ message: 'Notice added successfully', notice: newNotice });
  } catch (error) {
    console.error('Error adding notice:', error);
    res.status(500).json({ message: 'Server error, failed to add notice' });
  }
};

const getAllNotices = async (req, res) => {
  try {
    const params = req.query; 
    console.log(params);
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Server error, failed to retrieve notices' });
  }
};


// Remove Notice
const removeNotice = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the notice by ID directly
    const notice = await Notice.findByIdAndDelete(id);

    // If notice not found
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.status(200).json({ message: 'Notice removed successfully' });
  } catch (error) {
    console.error('Error removing notice:', error);
    res.status(500).json({ message: 'Server error, failed to remove notice' });
  }
};

module.exports = { addNotice, getAllNotices, removeNotice };
