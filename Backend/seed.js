const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Portfolio = require('./models/Portfolio');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Portfolio.deleteMany();

        // Create Admin User
        const adminUser = new User({
            username: 'admin',
            email: 'saurabhgupta24979@gmail.com',
            password: 'password123', // Change this after first login
            isAdmin: true
        });
        await adminUser.save();
        console.log('Admin User Created');

        // Create Default Portfolio Data
        const portfolioData = new Portfolio({
            name: 'Saurabh Gupta',
            role: 'Full Stack Developer',
            about: 'I am a passionate developer...',
            email: 'saurabhgupta24979@gmail.com',
            phone: '+91 96967 43829',
            address: 'Gallamandi Naubasta, Kanpur Nagar',
            education: [
                {
                    institution: 'Shaheed Bhagat Singh State University',
                    batch: '2022-2026',
                    cgpa: '7'
                }
            ],
            socialLinks: {
                github: 'https://github.com/saurabh',
                linkedin: 'https://linkedin.com/in/saurabh',
                instagram: 'https://instagram.com/saurabh'
            },
            skills: [
                {
                    category: "Frontend",
                    subtitle: "Crafting User Interfaces",
                    mastery: 90,
                    items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Redux", "TypeScript"]
                },
                {
                    category: "Backend",
                    subtitle: "Server Side Logic",
                    mastery: 85,
                    items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL"]
                },
                {
                    category: "AI Engineering",
                    subtitle: "Intelligent Systems",
                    mastery: 75,
                    items: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "OpenAI API"]
                },
                {
                    category: "Computer Science",
                    subtitle: "Core Fundamentals",
                    mastery: 80,
                    items: ["Data Structures", "Algorithms", "OOPs", "DBMS", "OS", "System Design"]
                },
                {
                    category: "Cloud & DevOps",
                    subtitle: "Infrastructure & Deployment",
                    mastery: 70,
                    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux", "Nginx", "Git"]
                },
                {
                    category: "Programming Languages",
                    subtitle: "Polyglot Coding",
                    mastery: 85,
                    items: ["JavaScript", "Python", "Java", "C++", "TypeScript", "SQL"]
                }
            ],
            projects: [
                {
                    title: "Nebula AI Chatbot",
                    description: "An intelligent conversational agent built with OpenAI's GPT-4 API. Features real-time streaming responses, context retention, and a sleek, glassmorphism UI. Designed to assist developers with code snippets and debugging.",
                    link: "https://github.com/saurabh",
                    github: "https://github.com/saurabh",
                    tags: ["React", "Node.js", "OpenAI API", "Tailwind CSS", "Socket.io"]
                },
                {
                    title: "Quantum E-Commerce",
                    description: "A full-scale e-commerce platform featuring a modern dashboard, payment integration with Stripe, and real-time order tracking. Built for scalability and performance with a microservices architecture.",
                    link: "https://github.com/saurabh",
                    github: "https://github.com/saurabh",
                    tags: ["Next.js", "PostgreSQL", "Stripe", "Docker", "Redux"]
                },
                {
                    title: "Cyberpunk Portfolio",
                    description: "A highly interactive, visually stunning personal portfolio website with 3D elements, particle animations, and a retro-futuristic aesthetic. Fully responsive and optimized for SEO.",
                    link: "https://github.com/saurabh",
                    github: "https://github.com/saurabh",
                    tags: ["React", "Three.js", "Framer Motion", "GSAP", "Vite"]
                }
            ],
            certifications: [
                {
                    title: "Meta Frontend Developer Professional Certificate",
                    issuer: "Coursera",
                    date: "2024",
                    link: "https://coursera.org",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Meta_Platforms_Inc._logo.svg/1024px-Meta_Platforms_Inc._logo.svg.png"
                },
                {
                    title: "AWS Certified Cloud Practitioner",
                    issuer: "Amazon Web Services",
                    date: "2023",
                    link: "https://aws.amazon.com",
                    image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                },
                {
                    title: "Full Stack Web Development Bootcamp",
                    issuer: "Udemy",
                    date: "2023",
                    link: "https://udemy.com",
                    image: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                }
            ]
        });
        await portfolioData.save();
        console.log('Portfolio Data Created');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
