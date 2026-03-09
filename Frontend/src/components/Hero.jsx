import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { Link } from 'react-scroll'; // Removed in favor of useNavigate
import { ArrowRight, Github, Linkedin, Mail, Code2, Database, Globe } from 'lucide-react';
import heroImage from '../assets/hero-image.png';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const Hero = () => {
    const { portfolioData } = usePortfolio();
    const [textIndex, setTextIndex] = useState(0);
    const words = ["Full Stack", "MERN Stack", "Scalable", "Secure"];
    const navigate = useNavigate();

    // Use dynamic image from context or fallback to default
    const heroImgSrc = portfolioData?.heroImage || heroImage;


    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 md:pt-40">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none mix-blend-screen" />

            {/* Left Sidebar - Social Links (Adjusted for new layout) */}
            {/* Left Sidebar - Removed to ensure empty side margins as per user request */}
            {/* Social Links are now moved to the main content area */}
            {/* <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-8 items-center z-20">...</div> */}

            <div className="layout-wrapper relative z-10 grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-100px)]">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full text-center lg:text-center flex flex-col items-center"
                >
                    <div className="inline-block px-5 py-2 border border-slate-700 rounded-full bg-slate-900/50 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                        <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-semibold text-base flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                            Available for freelance work
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
                        Architecting <br />
                        <motion.span
                            key={textIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 bg-clip-text text-transparent inline-block pb-1"
                        >
                            {words[textIndex]}
                        </motion.span> <br />
                        <span className="text-white">Solutions.</span>
                    </h1>

                    <p className="text-slate-400 text-base md:text-lg mb-8 max-w-xl leading-relaxed font-light">
                        I specialize in building <span className="text-violet-300 font-medium">high-performance</span>, <span className="text-pink-300 font-medium">secure</span>, and <span className="text-cyan-300 font-medium">scalable</span> web applications using the modern MERN ecosystem.
                    </p>

                    {/* Description Section */}
                    <div className="w-full max-w-lg border-t border-slate-800 pt-6 mb-8">
                        <p className="text-slate-400 text-lg leading-relaxed font-light">
                            Bridging the gap between <span className="text-cyan-400 font-medium">Development</span> and <span className="text-violet-400 font-medium">Operations</span>. I architect robust <span className="text-white font-medium">Full Stack</span> systems and streamline workflows with modern <span className="text-pink-400 font-medium">DevOps</span> practices.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-6 justify-center mt-8 mb-12">
                        <button
                            onClick={() => navigate('/projects')}
                            className="bg-white text-slate-950 hover:bg-violet-600 hover:text-white hover:border-violet-600 font-bold text-base px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                            View Projects <ArrowRight size={20} />
                        </button>
                        <button
                            onClick={() => navigate('/contact')}
                            className="bg-slate-800/50 text-white font-bold text-base px-8 py-4 rounded-full border border-slate-700 hover:bg-cyan-900/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all hover:scale-105 active:scale-95"
                        >
                            Contact Me
                        </button>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6 justify-center mt-8">
                        <a href={portfolioData?.socialLinks?.github || "https://github.com"} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors hover:scale-110">
                            <Github size={24} />
                        </a>
                        <a href={portfolioData?.socialLinks?.linkedin || "https://linkedin.com"} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors hover:scale-110">
                            <Linkedin size={24} />
                        </a>
                        <a href={`mailto:${portfolioData?.email || "email@example.com"}`} className="text-slate-400 hover:text-pink-400 transition-colors hover:scale-110">
                            <Mail size={24} />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="w-full max-w-[320px] ml-auto mr-12 relative">
                        {/* Abstract tech background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-violet-600/20 to-pink-600/20 rounded-full blur-[60px] animate-pulse-slow"></div>

                        {/* Main Hero Image - Scaled Down & Right Aligned */}
                        <div className="relative z-10 w-full group perspective-1000">
                            <div className="relative transform transition-transform duration-700 group-hover:rotate-y-3 group-hover:rotate-x-3 preserve-3d">
                                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-pink-600 rounded-[2rem] transform rotate-6 scale-105 opacity-30 group-hover:rotate-12 transition-transform duration-700"></div>
                                <img
                                    src={heroImgSrc}
                                    alt="Saurabh Gupta"
                                    className="w-full h-auto aspect-[4/5] object-cover object-top rounded-[2rem] shadow-2xl border border-slate-700/50 relative z-20"
                                />

                                {/* Floating Tech Cards */}
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -right-8 top-16 bg-slate-900/90 backdrop-blur-xl p-4 rounded-xl border border-slate-700 shadow-xl z-30 flex items-center gap-3"
                                >
                                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                                        <Code2 className="text-cyan-400" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-[10px] font-bold uppercase">Stack</p>
                                        <p className="text-white text-sm font-bold">Full MERN</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -left-8 bottom-24 bg-slate-900/90 backdrop-blur-xl p-4 rounded-xl border border-slate-700 shadow-xl z-30 flex items-center gap-3"
                                >
                                    <div className="p-2 bg-green-500/20 rounded-lg">
                                        <Database className="text-green-400" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-[10px] font-bold uppercase">Backend</p>
                                        <p className="text-white text-sm font-bold">Scalable</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div >
        </section >
    );
};
export default Hero;
