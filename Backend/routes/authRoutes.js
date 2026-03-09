const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { authUser, forgotPassword, verifyOtp, resetPassword, updatePassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Rate limiting for auth routes to prevent brute-force
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: { message: 'Too many authentication attempts from this IP, please try again after 15 minutes.' }
});

router.post('/login', authLimiter, authUser);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/verify-otp', authLimiter, verifyOtp);
router.post('/reset-password', authLimiter, resetPassword);
router.put('/update-password', protect, updatePassword);

module.exports = router;
