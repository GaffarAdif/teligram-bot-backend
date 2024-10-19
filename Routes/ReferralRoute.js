const express = require('express');
const { createReferral, getReferralByReferer, getReferralByReferral,searchByReferCode } = require('../controllers/ReferrelsControllers');
const router = express.Router();

router.post('/', createReferral); // Create referral
router.get('/by-referer/:refererId', getReferralByReferer); // Get by referer
router.get('/by-referral/:referralId', getReferralByReferral); // Get by referral
router.get('/by-refercode/:referCode', searchByReferCode); // Get by referral

module.exports = router;
