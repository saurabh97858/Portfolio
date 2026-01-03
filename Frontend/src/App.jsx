import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TechMarquee from './components/TechMarquee';
import HackerTerminal from './components/HackerTerminal';
import Hero from './components/Hero';
import ParticleBackground from './components/ParticleBackground';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <Router>
            <div className="bg-slate-950 text-white min-h-screen font-sans relative">
                {/* Global Background Animation */}
                <div className="fixed inset-0 z-0">
                    <ParticleBackground />
                </div>

                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500 origin-left z-[100]"
                    style={{ scaleX }}
                />
                <Routes>
                    {/* Portfolio Pages Route Group */}
                    <Route
                        path="*"
                        element={
                            <>
                                <Navbar />
                                <main>
                                    <Routes>
                                        <Route path="/" element={<><Hero /><TechMarquee /><HackerTerminal /></>} />
                                        <Route path="/about" element={<div className="pt-20"><About /></div>} />
                                        <Route path="/skills" element={<div className="pt-20"><Skills /></div>} />
                                        <Route path="/projects" element={<div className="pt-20"><Projects /></div>} />
                                        <Route path="/contact" element={<div className="pt-20"><Contact /></div>} />
                                    </Routes>
                                </main>
                                <Footer />
                            </>
                        }
                    />

                    {/* Standalone Pages */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
