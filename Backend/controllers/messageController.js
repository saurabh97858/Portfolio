const Message = require('../models/Message');

// @desc    Create new message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newMessage = new Message({ name, email, subject, message });
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error("Error creating message:", error); // Added logging
        res.status(500).json({ message: 'Failed to send message' });
    }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
};

module.exports = { createMessage, getMessages };
