import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Bot, Sparkles, Cpu, Terminal, Volume2, VolumeX, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Futuristic AI Assistant Component with Comprehensive Recruiter-Focused Voice Synthesis
const AIAssistantAvatar = () => {
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    const phrases = [
        "Welcome to Saurabh's portfolio! 👋 I'm his AI Career Assistant.",
        "Saurabh worked as Junior Software Engineer at Shiwansh Solutions & MERN Developer at Zidio Development.",
        "He holds a B.Tech in Computer Science from Shaheed Bhagat Singh State University, Ferozepur.",
        "He builds scalable SaaS platforms, REST APIs, and AI integrations. Open for hire & full-time roles!"
    ];

    // Function to speak phrase out loud using Web Speech Synthesis API
    const speakText = (text) => {
        if (isMuted || !('speechSynthesis' in window)) return;
        try {
            window.speechSynthesis.cancel(); // Reset active speech
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.92; // Clear articulate recruiter pitch pace
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => (v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David')))) || voices.find(v => v.lang.startsWith('en')) || voices[0];
            if (preferredVoice) utterance.voice = preferredVoice;

            window.speechSynthesis.speak(utterance);
        } catch (err) {
            console.log("Speech synthesis failed", err);
        }
    };

    useEffect(() => {
        // Automatically speak out loud 2 seconds after page load
        const initialTimer = setTimeout(() => {
            speakText(phrases[0]);
        }, 2000);

        const interval = setInterval(() => {
            setCurrentPhrase((prev) => {
                const next = (prev + 1) % phrases.length;
                speakText(phrases[next]);
                return next;
            });
        }, 5500);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, [isMuted]);

    const handleOrbClick = () => {
        speakText(phrases[currentPhrase]);
    };

    return (
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] mx-auto flex flex-col items-center justify-center p-4">
            
            {/* Background Glow Aura */}
            <div className="absolute w-72 h-72 bg-gradient-to-r from-violet-600/30 via-fuchsia-500/20 to-cyan-500/30 rounded-full blur-[70px] animate-pulse pointer-events-none z-0" />

            {/* AI Speech Bubble */}
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-20 w-full mb-6 bg-slate-900/95 backdrop-blur-xl border border-violet-500/40 rounded-2xl p-4 sm:p-5 shadow-[0_0_35px_rgba(139,92,246,0.35)] flex items-start gap-3"
            >
                <div className="p-2.5 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-500 rounded-xl text-white shadow-lg shrink-0 mt-0.5 animate-bounce">
                    <Bot size={22} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 uppercase flex items-center gap-1.5">
                            <Sparkles size={13} className="text-violet-400 animate-spin" style={{ animationDuration: '6s' }} />
                            AI Career Recruiter Assistant
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    setIsMuted(!isMuted);
                                    if (!isMuted) window.speechSynthesis.cancel();
                                }}
                                className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                                title={isMuted ? "Enable Voice" : "Mute Voice"}
                            >
                                {isMuted ? <VolumeX size={13} className="text-red-400" /> : <Volume2 size={13} className="text-cyan-400" />}
                            </button>
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">RECRUITER READY</span>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        key={currentPhrase}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                        className="text-white font-medium text-xs sm:text-sm leading-snug cursor-pointer"
                        onClick={handleOrbClick}
                    >
                        {phrases[currentPhrase]}
                    </motion.div>

                    {/* Audio Wave Visualizer */}
                    <div className="flex items-center gap-1 mt-3 pt-2 border-t border-slate-800/80">
                        <Volume2 size={12} className="text-cyan-400 mr-1" />
                        <div className="flex items-center gap-0.5 h-3">
                            {[40, 90, 60, 100, 75, 45, 85, 30, 95, 50].map((h, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: isMuted ? '15%' : ['20%', `${h}%`, '20%'] }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        repeatType: 'mirror',
                                        delay: i * 0.08
                                    }}
                                    className="w-1 bg-gradient-to-t from-violet-500 to-cyan-400 rounded-full"
                                />
                            ))}
                        </div>
                        <span className="text-[10px] text-slate-400 ml-auto font-mono">
                            {isMuted ? "Muted" : "Speaking Recruiter Profile"}
                        </span>
                    </div>
                </div>

                <div className="absolute -bottom-2.5 left-10 w-4 h-4 bg-slate-900 border-r border-b border-violet-500/40 rotate-45" />
            </motion.div>

            {/* AI Assistant Core Hologram */}
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center pointer-events-auto">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-violet-500/30"
                />

                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-3 rounded-full border border-cyan-400/40 border-t-transparent border-b-transparent"
                />

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-6 rounded-full border-2 border-transparent border-l-pink-500 border-r-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                />

                {/* Micro Badges */}
                <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-2 right-4 bg-slate-950/90 border border-violet-500/40 text-violet-300 text-[10px] font-mono px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 z-20 backdrop-blur-md"
                >
                    <Cpu size={12} className="text-cyan-400" />
                    <span>MERN + AI Specialist</span>
                </motion.div>

                <motion.div
                    animate={{ y: [6, -6, 6] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-2 left-2 bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 z-20 backdrop-blur-md"
                >
                    <Award size={12} className="text-pink-400" />
                    <span>B.Tech CSE Graduate</span>
                </motion.div>

                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 p-1 shadow-[0_0_50px_rgba(139,92,246,0.8),_0_0_90px_rgba(34,211,238,0.4)] flex items-center justify-center relative cursor-pointer group"
                    onClick={handleOrbClick}
                >
                    <div className="w-full h-full rounded-full bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-3 relative overflow-hidden group-hover:bg-slate-950/60 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 via-transparent to-cyan-500/20 animate-spin" style={{ animationDuration: '4s' }} />

                        <div className="p-3 bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-cyan-400 rounded-2xl text-white shadow-xl relative z-10 group-hover:scale-110 transition-transform">
                            <Bot size={32} />
                        </div>

                        <span className="text-[9px] font-black tracking-widest text-slate-300 uppercase mt-1 z-10">
                            SAURABH AI
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const Hero = () => {
    const { portfolioData } = usePortfolio();
    const [textIndex, setTextIndex] = useState(0);
    const words = ["Full Stack", "MERN Stack", "Scalable", "Secure"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center relative overflow-hidden pt-14 pb-14 md:pt-20 md:pb-20 bg-transparent">
            {/* Ambient Background Lights */}
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />

            <div className="layout-wrapper relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full max-w-7xl mx-auto px-4 md:px-8">
                
                {/* Left Column: Text & Bio */}
                <motion.div
                    initial={{ opacity: 0, x: -60, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
                >
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-slate-800 rounded-full bg-slate-900/80 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent font-bold text-xs uppercase tracking-wider">
                            Available for Full-Time & Freelance Roles
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-white">
                        Architecting <br />
                        <motion.span
                            key={textIndex}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4 }}
                            className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent inline-block py-1"
                        >
                            {words[textIndex]}
                        </motion.span> <br />
                        <span className="text-white">Solutions.</span>
                    </h1>

                    {/* Bio Description */}
                    <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-light">
                        I specialize in building <span className="text-violet-400 font-semibold">high-performance</span>, <span className="text-pink-400 font-semibold">secure</span>, and <span className="text-cyan-400 font-semibold">scalable</span> web applications using the modern MERN ecosystem.
                    </p>

                    <p className="text-slate-400 text-xs sm:text-sm max-w-lg leading-relaxed font-light border-l-2 border-violet-500/40 pl-4 py-1">
                        Bridging the gap between <span className="text-cyan-300 font-medium">Development</span> and <span className="text-violet-300 font-medium">Operations</span>. Architecting robust <span className="text-white font-medium">Full Stack</span> systems and streamlining modern <span className="text-pink-300 font-medium">DevOps</span> workflows.
                    </p>

                    {/* Social Links */}
                    <div className="pt-2 flex items-center gap-5 justify-center lg:justify-start">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Connect:</span>
                        <a
                            href={portfolioData?.socialLinks?.github || "https://github.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-violet-500/60 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all hover:-translate-y-1"
                        >
                            <Github size={18} />
                        </a>
                        <a
                            href={portfolioData?.socialLinks?.linkedin || "https://linkedin.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/60 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all hover:-translate-y-1"
                        >
                            <Linkedin size={18} />
                        </a>
                        <a
                            href={`mailto:${portfolioData?.email || "email@example.com"}`}
                            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-pink-400 hover:border-pink-500/60 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all hover:-translate-y-1"
                        >
                            <Mail size={18} />
                        </a>
                    </div>
                </motion.div>

                {/* Right Column: AI Voice Assistant Component */}
                <motion.div
                    initial={{ opacity: 0, x: 60, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="lg:col-span-5 flex justify-center items-center"
                >
                    <AIAssistantAvatar />
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
