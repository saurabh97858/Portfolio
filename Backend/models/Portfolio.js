const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    // link: String, // Deprecated in favor of specific links
    liveLink: String,
    githubLink: String,
    images: [String], // Array of image URLs
    tags: [String]
});

const portfolioSchema = new mongoose.Schema({
    name: { type: String, default: 'Saurabh Gupta' },
    role: { type: String, default: 'Full Stack Developer' },
    profileImage: { type: String, default: '' },
    heroImage: { type: String, default: '' }, // Dynamic Hero Image
    views: { type: Number, default: 0 },
    about: { type: String, default: 'I am a passionate developer...' },
    email: { type: String, default: 'saurabhgupta24979@gmail.com' },
    phone: { type: String, default: '+91 96967 43829' },
    address: { type: String, default: 'Gallamandi Naubasta, Kanpur Nagar' },
    education: [{
        institution: String,
        batch: String,
        cgpa: String
    }],
    experience: [{
        role: String,
        company: String,
        duration: String,
        description: String,
        tech: [String]
    }],
    certifications: [{
        title: String,
        issuer: String,
        date: String,
        link: String,
        image: String
    }],
    skills: [{
        category: String,
        subtitle: String,
        theme: String, // blue, violet, etc.
        color: String, // gradient string
        mastery: Number,
        items: [String],
        iconName: String // key to map icon on frontend
    }],
    socialLinks: {
        github: String,
        linkedin: String,
        instagram: String
    },
    projects: [projectSchema]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
