const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

const authMiddleware = (req, res, next) => {
// Get token from header
const token = req.header('Authorization')?.replace('Bearer ', '');

// Check if no token
if (!token) {
return res.status(401).json({ message: 'No token, authorization denied' });
}

try {
// Verify token
const decoded = jwt.verify(token, JWT_SECRET);
req.user = decoded;
next();
} catch (error) {
console.error('Token verification error:', error);
res.status(401).json({ message: 'Token is not valid' });
}
};

module.exports = authMiddleware;
