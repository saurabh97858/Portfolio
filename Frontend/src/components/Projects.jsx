import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
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
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono animate-pulse">Initializing Projects...</div>;

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
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                    style={{ filter: selectedProject ? 'blur(10px)' : 'none', transition: 'filter 0.3s' }}
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md shadow-lg">
                        Portfolio
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-2xl">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Works</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
                        A curated selection of technical challenges and creative solutions.
                    </p>
                </motion.div>

                {/* Vertical Grid for Projects */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10"
                    style={{ filter: selectedProject ? 'blur(10px)' : 'none', transition: 'filter 0.3s' }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            variants={cardVariants}
                            onClick={() => setSelectedProject({ ...project, index })}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Full Screen Overlay for Details */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="bg-slate-900 overflow-hidden rounded-2xl max-w-3xl w-full relative z-[1001] border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.3)] max-h-[90vh] overflow-y-auto custom-scrollbar"
                            onClick={(e) => e.stopPropagation()} // Prevent clicking modal body from closing it
                        >
                            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-sm transition-colors z-10"><X size={20} /></button>
                            <img
                                src={selectedProject.images?.[0] || projectImages[selectedProject.index % projectImages.length]}
                                className="w-full h-56 md:h-80 object-cover border-b border-white/10"
                                alt={selectedProject.title}
                            />
                            <div className="p-6 md:p-10">
                                <h2 className="text-3xl font-bold text-white mb-4 leading-tight">{selectedProject.title}</h2>
                                <p className="text-slate-300 md:text-lg mb-8 leading-relaxed whitespace-pre-wrap">{selectedProject.description}</p>

                                {/* Link Buttons */}
                                <div className="flex flex-wrap gap-4 mt-auto">
                                    {selectedProject.liveLink && (
                                        <a href={selectedProject.liveLink} target="_blank" rel="noreferrer" className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-600/30">
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                    )}
                                    {selectedProject.githubLink && (
                                        <a href={selectedProject.githubLink} target="_blank" rel="noreferrer" className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-5 py-3 rounded-xl font-bold transition-all shadow-lg">
                                            <Github size={18} /> Source Code
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

const ProjectCard = ({ project, variants, onClick, index }) => {
    const bgImage = project.images?.[0] || projectImages[index % projectImages.length];

    return (
        <motion.div
            variants={variants}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            className="premium-glow-card cursor-pointer group"
        >
            <div className="premium-glow-inner">
                {/* Top Floating Live Button */}
                {project.liveLink && (
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-blue-600/80 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg backdrop-blur-md transition-all hover:scale-105"
                    >
                        <ExternalLink size={14} strokeWidth={2.5} /> Live
                    </a>
                )}

                {/* Shine Animation */}
                <div className="shine-overlay" />

                {/* Image Section */}
                <div className="w-full h-[200px] sm:h-[250px] md:h-[320px] overflow-hidden relative bg-slate-900">
                    <img
                        src={bgImage}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                    />
                    
                    {/* Overlay with Title on Hover (Optional but premium) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <h3 className="text-white font-bold text-xl drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.title}</h3>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;

