const express = require('express');
const { addNotice, getAllNotices ,removeNotice} = require('../controllers/noticeController');
const router = express.Router();

router.post('/', addNotice);   // Route for adding a new notice
router.get('/', getAllNotices); // Route for getting all notices
router.delete('/:id', removeNotice); // Delete notice by ID

module.exports = router;
