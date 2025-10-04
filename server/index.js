require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
const authRouter = require('./routes/authRoutes');
app.use('/api/auth', authRouter);

const sellerRoutes = require('./routes/sellerRoutes');
app.use('/api/sellers', sellerRoutes);

const adminSellerRoutes = require('./routes/adminSellersRoutes');
app.use('/api/admin/sellers', adminSellerRoutes);


// Example protected routes
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

// test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API working' });
});

// protected route (any logged-in user)
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Authenticated route', user: req.user });
});

// protected admin-only route
app.get('/api/admin/test', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Hello admin — access granted', user: req.user });
});

// DB connect
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected')) 
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} 🚀`));