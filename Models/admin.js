const mongoose = require('mongoose');

// Define the schema for the Admin with only a keyword field
const adminKeywordSchema = new mongoose.Schema({
  keyword: {
    type: String,
  }
});

// Create the model from the schema
const AdminKeyword = mongoose.model('AdminKeyword', adminKeywordSchema);

module.exports = AdminKeyword;
