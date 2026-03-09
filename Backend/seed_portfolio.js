const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Portfolio = require('./models/Portfolio');

const seedPortfolio = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Check if portfolio already exists
        const existing = await Portfolio.findOne({});
        if (existing) {
            console.log('Portfolio data already exists! No need to seed.');
            process.exit(0);
        }

        // Create initial portfolio document
        const portfolio = new Portfolio({
            name: 'Saurabh Gupta',
            role: 'Full Stack Developer',
            about: 'Passionate developer building modern web applications.',
            email: 'saurabhgupta24979@gmail.com',
            phone: '',
            profileImage: '',
            heroImage: '',
            socialLinks: {
                github: '',
                linkedin: '',
                instagram: ''
            },
            skills: [],
            projects: [],
            experience: [],
            certifications: [],
            education: [],
            views: 0
        });

        await portfolio.save();
        console.log('✅ Portfolio data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding Error:', error);
        process.exit(1);
    }
};

seedPortfolio();
