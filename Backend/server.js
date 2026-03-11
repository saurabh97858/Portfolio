const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');

dotenv.config();

const app = express();

// Middleware
// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Required for some inline scripts often used in dev
            connectSrc: ["'self'", "https:", "http://localhost:5005", "ws://localhost:5005", "http://localhost:5173"], // Allow connection to backend
        },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(cors({
    origin: '*', // Allow all for debugging
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Request Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// Database Connection
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s
        });
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('Critical MongoDB Connection Error:', err.message);
        throw err;
    }
};

// Middleware to ensure DB is connected before any request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({
            message: 'Database Connection Error',
            error: err.message,
            suggestion: 'Check if MONGO_URI is correct and IP is whitelisted in MongoDB Atlas'
        });
    }
});

const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/api/health', async (req, res) => {
    try {
        await connectDB();
        res.json({
            status: 'UP',
            db: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
            readyState: mongoose.connection.readyState,
            env: {
                hasMongo: !!process.env.MONGO_URI,
                hasJwt: !!process.env.JWT_SECRET
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'ERROR', db: 'Error', error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Portfolio Backend is Running');
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
