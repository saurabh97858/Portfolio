const express = require('express');
const router = express.Router();
const { getPortfolioData, getPortfolioImages, updatePortfolioData } = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getPortfolioData);
router.get('/images', getPortfolioImages);
router.put('/', protect, updatePortfolioData);

module.exports = router;
