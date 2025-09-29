const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error('Set MONGODB_URI in .env before running seedAdmin.js');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const existing = await User.findOne({ role: 'admin' });
  if (existing) {
    console.log('Admin already exists:', existing.email);
    process.exit(0);
  }

  const password = 'AdminPass123!'; 
  const hashed = await bcrypt.hash(password, 10);

  const admin = new User({
    name: 'Admin',
    email: 'admin@example.com',
    password: hashed,
    role: 'admin',
    status: 'approved'
  });

  await admin.save();
  console.log('Admin created: admin@example.com / AdminPass123!');
  console.log('Change the password or remove the seed file in production.');
  process.exit(0);
}
seed().catch(err => { console.error(err); process.exit(1); });
