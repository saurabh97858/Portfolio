const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { createMessage, getMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

const messageLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: { message: 'Too many requests from this IP, please try again after 15 minutes' }
});

router.post('/', messageLimiter, createMessage);
router.get('/', protect, getMessages);

module.exports = router;
