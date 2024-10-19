const Referral = require('../Models/Referels'); // Import the Referral model

// Create a new referral
const createReferral = async (req, res) => {
  try {
    const { referCode, referer, referral } = req.body;

    // Check if referral already exists
    const existingReferral = await Referral.findOne({ referral });
    if (existingReferral) {
      return res.status(400).json({ message: 'This user has already been referred' });
    }

    // Create new referral
    const newReferral = new Referral({
      referCode,
      referer,
      referral
    });

    await newReferral.save(); // Save to the database

    res.status(201).json({ message: 'Referral created successfully', referral: newReferral });
  } catch (error) {
    res.status(500).json({ message: 'Error creating referral', error: error.message });
  }
};

// Get referrals by referer
const getReferralByReferer = async (req, res) => {
  try {
    const { refererId } = req.params;

    const referrals = await Referral.find({ referer: refererId });

    if (!referrals || referrals.length === 0) {
      return res.status(404).json({ message: 'No referrals found for this referer' });
    }

    res.status(200).json({ referrals });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching referrals', error: error.message });
  }
};

// Get referrals by referral
const getReferralByReferral = async (req, res) => {
  try {
    const { referralId } = req.params;

    const referrals = await Referral.find({ referral: referralId });

    if (!referrals || referrals.length === 0) {
      return res.status(404).json({ message: 'No referrals found for this referral' });
    }

    res.status(200).json({ referrals });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching referrals', error: error.message });
  }
};

// Get referrals by refer code
const searchByReferCode = async (req, res) => {
  try {
    const { referCode } = req.params;

    // Find referrals by refer code
    const referrals = await Referral.find({ referCode });

    if (!referrals || referrals.length === 0) {
      return res.status(404).json({ message: 'No referrals found for this refer code' });
    }
console.log('its work');
    res.status(200).json({ referrals });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching referrals', error: error.message });
  }
};


module.exports = {
  createReferral,
  getReferralByReferer,
  getReferralByReferral,
  searchByReferCode
};
