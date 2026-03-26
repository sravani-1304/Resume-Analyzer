const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// Simple User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

// Test route
app.post('/api/test-register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const user = new User({ name, email, password });
    await user.save();
    
    res.json({ success: true, user: { name, email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/test-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    res.json({ success: true, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mongoose.connect('mongodb://localhost:27017/test-db')
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5001, () => {
      console.log('🚀 Test server on port 5001');
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
  });