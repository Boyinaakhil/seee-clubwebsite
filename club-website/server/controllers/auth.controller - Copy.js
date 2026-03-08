const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { JWT_SECRET } = require('../config/env');

const login = async (req, res) => {
try {
const { username, password } = req.body;

// Check if user exists
const admin = await Admin.findOne({ username });
if (!admin) {
  return res.status(401).json({ message: 'Invalid credentials' });
}

// Check password
const isPasswordValid = await admin.comparePassword(password);
if (!isPasswordValid) {
  return res.status(401).json({ message: 'Invalid credentials' });
}

// Create token
const token = jwt.sign(
  { id: admin._id, username: admin.username, role: admin.role },
  JWT_SECRET,
  { expiresIn: '7d' }
);

// Return user info and token
res.json({
  token,
  user: {
    id: admin._id,
    username: admin.username,
    role: admin.role
  }
});
} catch (error) {
console.error('Login error:', error);
res.status(500).json({ message: 'Server error' });
}
};

module.exports = {
login
};