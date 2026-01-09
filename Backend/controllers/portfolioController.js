const Portfolio = require('../models/Portfolio');

// @desc    Get portfolio data
// @route   GET /api/portfolio
// @access  Public
const getPortfolioData = async (req, res) => {
    try {
        // Find and increment views atomically
        const portfolio = await Portfolio.findOneAndUpdate(
            {},
            { $inc: { views: 1 } },
            { new: true, projection: { profileImage: 0, heroImage: 0 } }
        );

        if (portfolio) {
            res.json(portfolio);
        } else {
            // If no portfolio exists yet, try to find one without updating (though findOneAndUpdate usually handles this if we wanted upsert, but for get we just strictly look)
            // Actually, if it doesn't exist, we can't increment. 
            // In this specific app flow, the portfolio is usually seeded or created on first update.
            // Fallback to basic find if nothing found (unlikely for seeded DB)
            const fallback = await Portfolio.findOne({}, { profileImage: 0, heroImage: 0 });
            if (fallback) {
                res.json(fallback);
            } else {
                res.status(404).json({ message: 'Portfolio data not found' });
            }
        }
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get portfolio images (Heavy payload)
// @route   GET /api/portfolio/images
// @access  Public
const getPortfolioImages = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({}, { profileImage: 1, heroImage: 1 });
        if (portfolio) {
            res.json(portfolio);
        } else {
            res.status(404).json({ message: 'Images not found' });
        }
    } catch (error) {
        console.error('Error fetching images:', error);
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

module.exports = { getPortfolioData, getPortfolioImages, updatePortfolioData };
