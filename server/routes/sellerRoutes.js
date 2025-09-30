// server/routes/sellers.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const sellerController = require('../controllers/sellerController');

router.post('/request', auth, sellerController.applySeller);

module.exports = router;
