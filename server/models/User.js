const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true }, // hashed
  role:      { type: String, enum: ['admin','seller','customer'], default: 'customer' },
  status:    { type: String, enum: ['pending','approved'], default: 'approved' }, // sellers will be set to 'pending' at register
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
