const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const { JWT_SECRET } = require('../config');
const { EMAIL_USER, EMAIL_PASS } = require('../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const user = new User({ username, email, password, verificationToken });
        await user.save();

        const verificationLink = `http://localhost:9090/api/auth/verify/${verificationToken}`;
        await transporter.sendMail({
            from: EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Click the link to verify your email: ${verificationLink}`,
        });

        res.status(201).json({
            message: 'User created. Check your email for verification.',
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({ verificationToken: token });
        if (!user) return res.status(400).json({ message: 'Invalid token.' });

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.json({ message: 'Email verified successfully.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: 'Email not verified' });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
