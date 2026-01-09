const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Portfolio = require('./models/Portfolio');

dotenv.config();

const seedData = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('MongoDB Connected Successfully');

        // Initial Data to match the "filled up" portfolio user liked
        const portfolioData = {
            name: 'Saurabh Gupta',
            role: 'Full Stack & AI Engineer',
            about: 'Passionate developer bridging the gap between traditional software engineering and cutting-edge AI solutions. Expert in building scalable web applications and intelligent systems.',
            email: 'saurabhgupta24979@gmail.com',
            phone: '+91 96967 43829',
            profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop', // Placeholder Image
            skills: [
                {
                    category: 'Frontend Development',
                    subtitle: 'Building immersive UIs',
                    theme: 'blue',
                    color: 'from-cyan-500 to-blue-500',
                    mastery: 92,
                    items: ['React.js', 'Next.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
                    iconName: 'Globe'
                },
                {
                    category: 'Backend Architecture',
                    subtitle: 'Robust & Scalable Systems',
                    theme: 'violet',
                    color: 'from-violet-500 to-purple-500',
                    mastery: 88,
                    items: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'Redis'],
                    iconName: 'Server'
                },
                {
                    category: 'AI Engineering',
                    subtitle: 'Intelligent Solutions',
                    theme: 'rose',
                    color: 'from-rose-500 to-red-500',
                    mastery: 85,
                    items: ['TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'Computer Vision', 'NLP', 'RAG Pipelines'],
                    iconName: 'Cpu'
                },
                {
                    category: 'Computer Science',
                    subtitle: 'Core Fundamentals',
                    theme: 'indigo',
                    color: 'from-indigo-500 to-blue-600',
                    mastery: 90,
                    items: ['Data Structures', 'Algorithms', 'System Design', 'OS', 'Networking', 'Distributed Systems'],
                    iconName: 'Code2'
                }
            ],
            projects: [
                {
                    title: 'Neo-Portfolio',
                    description: 'A futuristic, glassmorphic personal portfolio built with React, Tailwind CSS, and Framer Motion. Features a custom Admin Dashboard for dynamic content management.',
                    liveLink: 'https://portfolio-saurabh.vercel.app',
                    githubLink: 'https://github.com/saurabh/portfolio',
                    tags: ['React', 'Tailwind', 'Node.js', 'MongoDB']
                },
                {
                    title: 'AI Chat Assistant',
                    description: 'An intelligent chatbot using RAG (Retrieval Augmented Generation) to answer context-aware queries. Integrated with OpenAI GPT-4.',
                    liveLink: '#',
                    githubLink: 'https://github.com/saurabh/ai-chat',
                    tags: ['Python', 'LangChain', 'OpenAI', 'React']
                },
                {
                    title: 'E-Commerce Platform',
                    description: 'Full-stack e-commerce solution with real-time inventory, payment gateway integration, and admin analytics dashboard.',
                    liveLink: '#',
                    githubLink: 'https://github.com/saurabh/ecommerce',
                    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma']
                }
            ],
            experience: [
                {
                    role: 'Senior Full Stack Developer',
                    company: 'Tech Innovations Inc.',
                    duration: '2023 - Present',
                    description: 'Leading a team of 5 developers to build enterprise-scale SaaS products. Reduced load times by 40% via edge caching.',
                    tech: ['React', 'Node.js', 'AWS']
                },
                {
                    role: 'AI Research Intern',
                    company: 'Future Labs',
                    duration: '2022 - 2023',
                    description: 'Researched and implemented computer vision models for automated quality control in manufacturing.',
                    tech: ['Python', 'PyTorch', 'OpenCV']
                }
            ]
        };

        await Portfolio.deleteMany({}); // Clear old data
        await Portfolio.create(portfolioData);

        console.log('Portfolio Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
