const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/userModel');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    });
};

module.exports = authMiddleware;
