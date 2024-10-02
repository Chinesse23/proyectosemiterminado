const express = require('express');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = role === 'admin' ? new Admin({ username, email, password, role }) : new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }) || await Admin.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful', role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

authRouter.get('/login', async (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login/index.html'));
});

module.exports = authRouter;
