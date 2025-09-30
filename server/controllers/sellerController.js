// server/controllers/sellerController.js
const User = require('../models/User');

exports.applySeller = async (req, res) => {
  try {
    const userId = req.user.id;
    const { businessName, description, phone } = req.body;

    if (!businessName || !businessName.trim()) {
      return res.status(400).json({ message: 'Business name is required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Prevent admins or existing sellers from applying 
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Admin cannot apply as seller' });
    }
    if (user.role === 'seller' || user.sellerStatus === 'approved') {
      return res.status(400).json({ message: 'User already a seller' });
    }
    if (user.role === 'seller_pending' || user.sellerStatus === 'pending') {
      return res.status(400).json({ message: 'Application already pending' });
    }

    // Update user
    user.role = 'seller_pending';
    user.sellerStatus = 'pending';
    user.sellerProfile = {
      businessName: businessName.trim(),
      description: description ? description.trim() : '',
      phone: phone ? phone.trim() : '',
      appliedAt: new Date()
    };

    await user.save();

    // return safe user info (no password)
    const safe = {
      id: user._id,
      email: user.email,
      role: user.role,
      sellerStatus: user.sellerStatus,
      sellerProfile: user.sellerProfile
    };

    return res.status(200).json({ message: 'Seller application submitted', user: safe });
  } catch (err) {
    console.error('applySeller error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
