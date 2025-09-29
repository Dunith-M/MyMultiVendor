// server/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API working' });
});

// DB connect
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected')) 
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} 🚀`));
