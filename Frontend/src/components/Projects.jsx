import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Eye, Sparkles, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const fallbackProjectImages = [
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1200&auto=format&fit=crop"
];

const Projects = () => {
    const { portfolioData, loading } = usePortfolio();
    const [selectedProject, setSelectedProject] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const projects = portfolioData?.projects || [];

    const playHoverChime = () => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12);
            gain.gain.setValueAtTime(0.06, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch (e) {}
    };

    if (loading) {
        return (
            <div className="min-h-[40vh] bg-transparent flex items-center justify-center text-white font-mono animate-pulse">
                Loading Projects...
            </div>
        );
    }

    const marqueeProjects = [...projects, ...projects, ...projects];

    return (
        <section id="projects" className="bg-transparent py-16 md:py-28 relative font-sans overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] -z-10 animate-pulse" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-md">
                        <Sparkles size={14} className="text-violet-400 animate-spin" style={{ animationDuration: '6s' }} />
                        PORTFOLIO SHOWCASE
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Works</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
                        Explore featured MERN Stack applications & production web systems.
                    </p>
                </motion.div>
            </div>

            {/* DESKTOP VIEW: Continuous Left-to-Right Auto Marquee Slider */}
            <div
                className="hidden md:block relative w-full overflow-hidden py-6"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    className={`flex items-center gap-7 w-max transition-all ${
                        isPaused ? '[animation-play-state:paused]' : ''
                    }`}
                    style={{
                        animation: 'marqueeRight 35s linear infinite',
                    }}
                >
                    {marqueeProjects.map((project, index) => {
                        const bgImage = project.images?.[0] || fallbackProjectImages[index % fallbackProjectImages.length];

                        return (
                            <div
                                key={index}
                                onMouseEnter={playHoverChime}
                                onClick={() => {
                                    playHoverChime();
                                    setSelectedProject(project);
                                }}
                                className="w-[370px] shrink-0 cursor-pointer group pointer-events-auto"
                            >
                                {/* Shining Animated Neon Border Light Beam */}
                                <div className="relative p-[2px] rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-shadow duration-500">
                                    <div className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,#8b5cf6,#ec4899,#38bdf8,#8b5cf6)] animate-spin-slow pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

                                    <div className="relative z-10 bg-slate-950/95 rounded-[1.4rem] overflow-hidden backdrop-blur-2xl flex flex-col h-full">
                                        <div className="relative w-full h-48 overflow-hidden bg-slate-950">
                                            <img
                                                src={bgImage}
                                                alt={project.title}
                                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                                            {project.liveLink && (
                                                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold backdrop-blur-md">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                                    LIVE
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="px-4 py-2 rounded-full bg-white text-slate-950 font-bold text-xs flex items-center gap-2 shadow-2xl">
                                                    <Eye size={14} /> Tap to Open Details
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                            <div className="space-y-2 pt-1 px-1">
                                                <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-normal block">
                                                    {project.title}
                                                </h3>
                                                <p className="text-slate-300 text-xs leading-relaxed font-light line-clamp-2">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div className="space-y-3 pt-2">
                                                {project.tags && project.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 px-1">
                                                        {project.tags.slice(0, 4).map((tag, tIdx) => (
                                                            <span key={tIdx} className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
                                                    {project.liveLink && (
                                                        <a
                                                            href={project.liveLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-all shadow-md active:scale-95"
                                                        >
                                                            <span>Live Demo</span>
                                                            <ArrowUpRight size={13} />
                                                        </a>
                                                    )}

                                                    {project.githubLink && (
                                                        <a
                                                            href={project.githubLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
                                                        >
                                                            <Github size={13} />
                                                            <span>Code</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* MOBILE VIEW: Vertical One-by-One Column Layout (Scrollable vertically!) */}
            <div className="block md:hidden max-w-lg mx-auto px-4 space-y-6">
                {projects.map((project, index) => {
                    const bgImage = project.images?.[0] || fallbackProjectImages[index % fallbackProjectImages.length];

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => {
                                playHoverChime();
                                setSelectedProject(project);
                            }}
                            className="relative p-[2px] rounded-3xl overflow-hidden shadow-xl"
                        >
                            {/* Animated Neon Border Beam for Mobile Cards */}
                            <div className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,#8b5cf6,#ec4899,#38bdf8,#8b5cf6)] animate-spin-slow pointer-events-none opacity-80" />

                            <div className="relative z-10 bg-slate-950/95 rounded-[1.4rem] overflow-hidden backdrop-blur-2xl flex flex-col">
                                <div className="relative w-full h-44 overflow-hidden bg-slate-950">
                                    <img
                                        src={bgImage}
                                        alt={project.title}
                                        className="w-full h-full object-cover object-top"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                                    {project.liveLink && (
                                        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[9px] font-mono font-bold backdrop-blur-md">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                            LIVE
                                        </div>
                                    )}
                                </div>

                                <div className="p-5 space-y-3">
                                    <h3 className="text-base sm:text-lg font-bold text-white leading-normal pt-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-300 text-xs leading-relaxed font-light line-clamp-3">
                                        {project.description}
                                    </p>

                                    {project.tags && project.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 pt-1">
                                            {project.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
                                        {project.liveLink && (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md active:scale-95"
                                            >
                                                <span>Live Demo</span>
                                                <ArrowUpRight size={13} />
                                            </a>
                                        )}

                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="py-2.5 px-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 font-bold text-xs flex items-center justify-center gap-1 active:scale-95"
                                            >
                                                <Github size={13} />
                                                <span>Code</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Custom Animations CSS */}
            <style>{`
                @keyframes marqueeRight {
                    0% { transform: translateX(-33.33%); }
                    100% { transform: translateX(0%); }
                }
                @keyframes spinSlow {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spinSlow 6s linear infinite;
                }
            `}</style>

            {/* Project Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col my-auto"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 text-slate-400 hover:text-white border border-slate-700 backdrop-blur-md transition-colors"
                            >
                                <X size={18} />
                            </button>

                            <div className="relative w-full h-56 sm:h-72 shrink-0 bg-slate-950">
                                <img
                                    src={selectedProject.images?.[0] || fallbackProjectImages[0]}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                            </div>

                            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2 pt-1 leading-normal">
                                        {selectedProject.title}
                                    </h3>
                                    <p className="text-slate-300 text-sm leading-relaxed font-light whitespace-pre-line">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                {selectedProject.tags && selectedProject.tags.length > 0 && (
                                    <div>
                                        <h4 className="text-[11px] font-mono font-bold text-slate-500 uppercase mb-2">Technologies Used</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedProject.tags.map((tag, i) => (
                                                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-mono">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-800">
                                    {selectedProject.liveLink && (
                                        <a
                                            href={selectedProject.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-2.5 px-5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                                        >
                                            <span>Visit Live App</span>
                                            <ExternalLink size={14} />
                                        </a>
                                    )}

                                    {selectedProject.githubLink && (
                                        <a
                                            href={selectedProject.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="py-2.5 px-5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                                        >
                                            <Github size={16} />
                                            <span>GitHub Code</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
