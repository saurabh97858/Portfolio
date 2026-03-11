const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }).maxTimeMS(5000);
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server Error during login', error: error.message });
    }
};

// @desc    Forgot Password (Generate OTP)
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash OTP
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp, salt);

        user.resetPasswordOtp = hashedOtp;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 mins
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Portfolio Admin Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}\n\nThis OTP is valid for 10 minutes. If you did not request this, please ignore this email.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email error:', error);
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.status(200).json({ message: `OTP sent to ${user.email.replace(/(.{2})(.*)(?=@)/, "$1***")}` });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
    const { username, otp } = req.body;
    try {
        const user = await User.findOne({ username, resetPasswordExpires: { $gt: Date.now() } });
        if (!user || !user.resetPasswordOtp) {
            return res.status(400).json({ message: 'OTP is invalid or has expired' });
        }

        const isMatch = await bcrypt.compare(otp.toString(), user.resetPasswordOtp);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // OTP verified, return a temporary token for password reset
        const resetToken = jwt.sign({ id: user._id, type: 'reset' }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.status(200).json({ message: 'OTP verified successfully', resetToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Reset Password with Token
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;
    try {
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        if (decoded.type !== 'reset') throw new Error('Invalid token type');

        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.password = newPassword;
        user.resetPasswordOtp = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully. You can now login.' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired reset token' });
    }
};

// @desc    Update Password (from Admin Panel)
// @route   PUT /api/auth/update-password
// @access  Private (Requires valid login token)
const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    // Auth middleware should populate req.user
    if (!req.user || !req.user._id) return res.status(401).json({ message: 'Not authorized' });

    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error updating password' });
    }
};

module.exports = { authUser, forgotPassword, verifyOtp, resetPassword, updatePassword };
