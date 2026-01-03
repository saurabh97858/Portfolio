const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Portfolio = require('./models/Portfolio');

dotenv.config();

const verifyData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
        const count = await Portfolio.countDocuments();
        console.log(`Portfolio Count: ${count}`);
        if (count > 0) {
            const data = await Portfolio.findOne();
            console.log('Sample Data:', JSON.stringify(data, null, 2));
        }
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

verifyData();
