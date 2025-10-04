// server/controllers/adminSellerController.js
const User = require('../models/User');
const mongoose = require('mongoose');

exports.listPendingSellers = async (req, res) => {
  try {
    const pending = await User.find({ sellerStatus: 'pending' })
      .select('-password -__v')
      .sort({ 'sellerProfile.appliedAt': -1 });
    return res.status(200).json({ sellers: pending });
  } catch (err) {
    console.error('listPendingSellers error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.approveSeller = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.sellerStatus !== 'pending') {
      return res.status(400).json({ message: 'User is not pending approval' });
    }

    user.role = 'seller';
    user.sellerStatus = 'approved';
    await user.save();

    return res.status(200).json({ message: 'Seller approved', user: {
      id: user._id, email: user.email, role: user.role, sellerStatus: user.sellerStatus, sellerProfile: user.sellerProfile
    }});
  } catch (err) {
    console.error('approveSeller error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.rejectSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body; // optional
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.sellerStatus !== 'pending') {
      return res.status(400).json({ message: 'User is not pending approval' });
    }

    // revert to customer (or keep as customer). You can choose to keep role as 'seller_pending' — here we set to customer.
    user.role = 'customer';
    user.sellerStatus = 'rejected';
    user.sellerProfile = { ...user.sellerProfile, rejectedAt: new Date(), rejectionReason: reason || '' };

    await user.save();

    return res.status(200).json({ message: 'Seller rejected', user: {
      id: user._id, email: user.email, role: user.role, sellerStatus: user.sellerStatus, sellerProfile: user.sellerProfile
    }});
  } catch (err) {
    console.error('rejectSeller error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
