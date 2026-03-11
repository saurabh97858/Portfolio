import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, X, Eye } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import './ProjectCard.css';

const projectImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2946&auto=format&fit=crop"
];

const Projects = () => {
    const { portfolioData, loading } = usePortfolio();
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = portfolioData?.projects || [];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono animate-pulse text-lg tracking-widest">INITIALIZING PROJECTS...</div>;

    return (
        <section id="projects" className="bg-slate-950 py-20 md:py-32 relative font-sans overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[1000px] h-[1000px] bg-violet-600/5 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDuration: '15s' }} />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDuration: '12s' }} />
            </div>

            <div className="layout-wrapper relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16 md:mb-24"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block py-2 px-6 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-black tracking-[0.2em] uppercase mb-6 backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                    >
                        Portfolio
                    </motion.span>
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 drop-shadow-sm">Works</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        A showcase of technical complexity meeting clean aesthetics.
                    </p>
                </motion.div>

                {/* Project Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject({ ...project, index })}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50, rotateX: 10 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="bg-slate-900 overflow-hidden rounded-[2.5rem] max-w-4xl w-full relative z-[1001] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] max-h-[92vh] overflow-y-auto custom-scrollbar preserve-3d"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-xl transition-all z-20 border border-white/10 hover:scale-110 active:scale-90"><X size={24} /></button>

                            <div className="relative h-64 md:h-[450px]">
                                <img
                                    src={selectedProject.images?.[0] || projectImages[selectedProject.index % projectImages.length]}
                                    className="w-full h-full object-cover object-top"
                                    alt={selectedProject.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                            </div>

                            <div className="p-8 md:p-12 -mt-20 relative z-10">
                                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter drop-shadow-xl">{selectedProject.title}</h1>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedProject.tags?.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-400 text-xs font-bold transition-colors hover:border-violet-500/50 hover:text-violet-300">{tag}</span>
                                    ))}
                                </div>

                                <p className="text-slate-300 text-lg md:text-xl mb-12 leading-relaxed font-light whitespace-pre-wrap">{selectedProject.description}</p>

                                <div className="flex flex-wrap gap-4">
                                    {selectedProject.liveLink && (
                                        <a href={selectedProject.liveLink} target="_blank" rel="noreferrer" className="flex-1 min-w-[180px] flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-fuchsia-500/20 hover:-translate-y-1 active:scale-95">
                                            <ExternalLink size={20} /> Live Preview
                                        </a>
                                    )}
                                    {selectedProject.githubLink && (
                                        <a href={selectedProject.githubLink} target="_blank" rel="noreferrer" className="flex-1 min-w-[180px] flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 active:scale-95">
                                            <Github size={20} /> Repository
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

const ProjectCard = ({ project, onClick, index }) => {
    const cardRef = useRef(null);
    const bgImage = project.images?.[0] || projectImages[index % projectImages.length];

    // Mouse movement for 3D effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (event) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        x.set(mouseX / rect.width - 0.5);
        y.set(mouseY / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="perspective-1000 cursor-pointer group pointer-events-auto"
            style={{ rotateX, rotateY }}
        >
            <div className="premium-glow-card relative transform-gpu preserve-3d shadow-2xl">
                <div className="premium-glow-inner relative z-10 bg-slate-900/40 rounded-[2rem] overflow-hidden border border-white/5 backdrop-blur-3xl group-hover:border-white/20 transition-colors duration-500">

                    {/* View Button Overlay */}
                    <div className="absolute inset-0 bg-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            className="bg-white text-slate-950 p-4 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center gap-2 transform translate-z-50"
                        >
                            <Eye size={20} strokeWidth={3} />
                            <span className="font-black text-xs uppercase tracking-tighter">Project Details</span>
                        </motion.div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full h-[280px] sm:h-[350px] md:h-[420px] overflow-hidden relative">
                        <motion.img
                            src={bgImage}
                            alt={project.title}
                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1)"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                        {/* Title reveal */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-z-30">
                            <h3 className="text-white font-black text-3xl md:text-4xl tracking-tighter drop-shadow-2xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-500">{project.title}</h3>
                            <div className="w-12 h-1 bg-violet-500 mt-4 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </div>
                    </div>
                </div>

                {/* Animated Border/Glow effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-700 -z-10" />
                <div className="absolute -inset-[10px] bg-violet-600/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-20" />
            </div>
        </motion.div>
    );
};

export default Projects;

