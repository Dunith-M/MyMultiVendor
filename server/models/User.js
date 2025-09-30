// server/models/User.js
const mongoose = require('mongoose');

const sellerProfileSchema = new mongoose.Schema({
  businessName: { type: String },
  description: { type: String },
  phone: { type: String },
  appliedAt: { type: Date }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // roles: customer | seller | admin | seller_pending
  role: { 
    type: String,
    enum: ['customer', 'seller', 'admin', 'seller_pending'],
    default: 'customer'
  },
  // seller application status: none | pending | approved | rejected
  sellerStatus: {
    type: String,
    enum: ['none', 'pending', 'approved', 'rejected'],
    default: 'none'
  },
  sellerProfile: { type: sellerProfileSchema, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

