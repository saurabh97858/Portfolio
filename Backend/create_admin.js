const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists. Updating password...');
            existingAdmin.password = 'password123';
            await existingAdmin.save();
            console.log('Admin password reset to: password123');
        } else {
            const adminUser = new User({
                username: 'admin',
                password: 'password123',
                isAdmin: true
            });
            await adminUser.save();
            console.log('Admin user created successfully');
        }
        process.exit();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

createAdmin();
