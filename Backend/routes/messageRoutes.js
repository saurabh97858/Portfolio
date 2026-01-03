const express = require('express');
const router = express.Router();
const { createMessage, getMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createMessage);
router.get('/', protect, getMessages);

module.exports = router;
