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
            console.log('Admin user already exists. Updating password and email...');
            existingAdmin.password = 'password123';
            existingAdmin.email = 'saurabhgupta24979@gmail.com';
            await existingAdmin.save();
            console.log('Admin password reset to: password123, email set to saurabhgupta24979@gmail.com');
        } else {
            const adminUser = new User({
                username: 'admin',
                email: 'saurabhgupta24979@gmail.com',
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
