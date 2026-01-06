import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Github, Linkedin, Mail, Code2, Database, Globe } from 'lucide-react';
import heroImage from '../assets/hero-image.png';

const Hero = () => {
    const [textIndex, setTextIndex] = useState(0);
    const words = ["Full Stack", "MERN Stack", "Scalable", "Secure"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-4">
            {/* Background Glows (Optional, reduced opacity for cleaner look) */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] animate-pulse delay-700 pointer-events-none" />

            {/* Left Sidebar - Social Links */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 items-center z-20">
                <div className="w-[2px] h-24 bg-gradient-to-b from-transparent via-violet-500 to-transparent"></div>
                <div className="flex flex-col gap-6">
                    <a href="https://github.com/saurabh97858" target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-full text-slate-400 hover:text-white hover:bg-violet-600 transition-all hover:scale-110"><Github size={24} /></a>
                    <a href="https://www.linkedin.com/in/saurabh-gupta-69a499265/" target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-full text-slate-400 hover:text-white hover:bg-pink-600 transition-all hover:scale-110"><Linkedin size={24} /></a>
                    <a href="mailto:saurabhgupta24979@gmail.com" className="p-3 glass-card rounded-full text-slate-400 hover:text-white hover:bg-cyan-600 transition-all hover:scale-110"><Mail size={24} /></a>
                </div>
                <div className="w-[2px] h-24 bg-gradient-to-b from-violet-500 to-transparent"></div>
            </div>

            <div className="section-container relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="pl-8"
                >
                    <div className="inline-block px-4 py-2 border border-slate-700 rounded-full bg-slate-900/50 backdrop-blur-sm mb-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                        <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Available for work
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 tracking-tight min-h-[90px] md:min-h-[auto]">
                        Architecting <br />
                        <motion.span
                            key={textIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="gradient-text text-glow inline-block"
                        >
                            {words[textIndex]}
                        </motion.span> <br />
                        Solutions.
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base mb-6 max-w-lg leading-relaxed">
                        I specialize in building high-performance, secure, and scalable web applications using modern technologies like MERN Stack and Next.js.
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <Link to="projects" smooth={true} duration={500}>
                            <button className="btn-primary flex items-center gap-3 text-lg px-8 py-4 group">
                                View My Work <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative animate-float"
                >
                    {/* Abstract tech background */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 to-pink-600/30 rounded-full blur-[60px] animate-pulse"></div>

                    {/* Main Hero Image - Stock Dev Image */}
                    <div className="relative z-10 w-full max-w-[280px] mx-auto group perspective-1000">
                        <div className="relative transform transition-transform duration-500 group-hover:rotate-y-6 group-hover:rotate-x-6 preserve-3d">
                            <img
                                src={heroImage}
                                alt="Saurabh Gupta"
                                className="w-full h-auto aspect-square object-cover object-center rounded-2xl shadow-2xl border border-slate-700/50 relative z-20"
                            />

                            {/* Floating Tech Icons */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-6 top-10 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl z-30"
                            >
                                <Code2 className="text-cyan-400" size={32} />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -left-6 bottom-20 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl z-30"
                            >
                                <Database className="text-green-400" size={32} />
                            </motion.div>

                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute right-10 bottom-10 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl z-30 hidden md:block"
                            >
                                <Globe className="text-violet-400" size={32} />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
export default Hero;
