const express = require('express');
const router = express.Router();
const { getPortfolioData, updatePortfolioData } = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getPortfolioData);
router.put('/', protect, updatePortfolioData);

module.exports = router;
