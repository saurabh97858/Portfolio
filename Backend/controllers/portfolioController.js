const Portfolio = require('../models/Portfolio');

// @desc    Get portfolio data
// @route   GET /api/portfolio
// @access  Public
const getPortfolioData = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (portfolio) {
            res.json(portfolio);
        } else {
            res.status(404).json({ message: 'Portfolio data not found' });
        }
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update portfolio data
// @route   PUT /api/portfolio
// @access  Private/Admin
const updatePortfolioData = async (req, res) => {
    try {
        const updates = req.body;
        // Upsert: Update if exists, create if not
        const portfolio = await Portfolio.findOneAndUpdate(
            {},
            { $set: updates },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.json(portfolio);
    } catch (error) {
        console.error('Error updating portfolio:', error);
        res.status(500).json({ message: 'Failed to update data' });
    }
};

module.exports = { getPortfolioData, updatePortfolioData };
