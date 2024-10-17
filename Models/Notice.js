const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  message: { type: String, required: true }
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
