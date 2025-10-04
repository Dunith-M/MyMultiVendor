// server/routes/adminSellers.js
const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');       
const isAdmin = require('../middleware/isAdmin');
const adminSellerController = require('../controllers/adminSellerController');

// GET /api/admin/sellers  -> list pending
router.get('/', auth, isAdmin, adminSellerController.listPendingSellers);

// POST /api/admin/sellers/:id/approve
router.post('/:id/approve', auth, isAdmin, adminSellerController.approveSeller);

// POST /api/admin/sellers/:id/reject
router.post('/:id/reject', auth, isAdmin, adminSellerController.rejectSeller);

module.exports = router;
