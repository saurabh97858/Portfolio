import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TechMarquee from './components/TechMarquee';
import HomeNavigation from './components/HomeNavigation';
import ScrollToTop from './components/ScrollToTop';


import Hero from './components/Hero';
import ParticleBackground from './components/ParticleBackground';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Outlet, Navigate } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';

// Layout Component
const Layout = () => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
            <Outlet />
        </main>
        {/* Moderate Space Forcer */}
        <div className="w-full h-10 md:h-16 bg-slate-950"></div>
        <Footer />
    </div>
);

import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <PortfolioProvider>
            <Router>
                <ScrollToTop />
                <div className="bg-slate-950 text-white min-h-[100dvh] font-sans relative">
                    {/* Global Background Animation */}
                    <div className="fixed inset-0 z-0">
                        <ParticleBackground />
                    </div>

                    <motion.div
                        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500 origin-left z-[100]"
                        style={{ scaleX }}
                    />
                    <Routes>
                        {/* Public Routes wrapped in Layout */}
                        <Route element={<Layout />}>
                            <Route path="/" element={
                                <>
                                    <div id="home-wrapper"><Hero /></div>
                                    <TechMarquee />
                                    <div id="about-wrapper"><About /></div>
                                    <div id="skills-wrapper"><Skills /></div>
                                    <div id="projects-wrapper"><Projects /></div>
                                    <div id="contact-wrapper"><Contact /></div>
                                </>
                            } />
                        </Route>

                        {/* Standalone Pages */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />

                        {/* Catch all - Redirect to Home */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </Router>
        </PortfolioProvider>
    );
}

export default App;
