// routes/telegramRoutes.js
const express = require('express');
const { handleUpdate } = require('../controllers/teligramController');

const router = express.Router();

router.post('/webhook', (req,res)=>{
    console.log('its work');
});

module.exports = router;
