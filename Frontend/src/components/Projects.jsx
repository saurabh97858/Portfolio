import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, FolderGit2, Star, GitFork, X, Code, Layers, Cpu } from 'lucide-react';

const projectImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2946&auto=format&fit=crop"
];

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`);
                const data = await res.json();
                if (data.projects) setProjects(data.projects);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono animate-pulse">Initializing Projects...</div>;

    return (
        <section id="projects" className="bg-slate-950 pb-24 relative font-sans overflow-hidden">
            {/* SPACER: Balanced for Aesthetics */}
            <div className="w-full h-20 md:h-24 shrink-0" aria-hidden="true" />

            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[1000px] h-[1000px] bg-violet-600/5 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDuration: '15s' }} />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDuration: '12s' }} />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0)_0%,rgba(2,6,23,0.8)_100%)] z-0" />
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                    style={{ filter: selectedProject ? 'blur(10px)' : 'none', transition: 'filter 0.3s' }}
                >
                    <span className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
                        Portfolio
                    </span>
                    <h2 className="text-xl md:text-3xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Works</span>
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-xl md:text-2xl font-light leading-relaxed">
                        A curated selection of technical challenges and creative solutions.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12"
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

            {/* Full Screen Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <ProjectDetailCard project={selectedProject} onClose={() => setSelectedProject(null)} />
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

const ProjectCard = ({ project, variants, onClick, index }) => {
    // Deterministic image selection based on title length or index
    const bgImage = projectImages[index % projectImages.length];

    return (
        <motion.div
            layoutId={`project-card-${project._id || index}`}
            variants={variants}
            onClick={onClick}
            whileHover={{ y: -15 }}
            className="group relative h-full flex flex-col cursor-pointer"
        >
            {/* Glossy Overlay Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 rounded-[2.5rem] blur-md transition duration-500" />

            <motion.div className="relative flex-1 bg-slate-900/60 border border-white/10 p-6 md:p-8 rounded-[2.2rem] backdrop-blur-2xl transition-all duration-300 group-hover:bg-slate-900/90 shadow-2xl flex flex-col overflow-hidden">

                {/* Background Image (Subtle) */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={bgImage}
                        alt="Project Background"
                        className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-all duration-500 scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/95" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                    {/* Top Section: Icon & Links */}
                    <div className="flex justify-between items-start mb-8">
                        <div className="p-4 bg-slate-800/80 rounded-2xl text-violet-400 border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-300 backdrop-blur-md">
                            <FolderGit2 size={32} />
                        </div>
                        <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/50 uppercase tracking-wider">
                                View Details
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mb-8 flex-1">
                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all">
                            {project.title}
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed font-light line-clamp-3">
                            {project.description}
                        </p>
                    </div>

                    {/* Divider Line with Gradient */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2.5">
                        {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-3 py-1.5 text-sm font-medium text-cyan-400 bg-cyan-950/30 rounded-lg border border-cyan-500/10 hover:bg-cyan-500/10 transition-colors cursor-default">
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 3 && (
                            <span className="px-3 py-1.5 text-sm font-medium text-slate-500 bg-white/5 rounded-lg border border-white/5">
                                +{project.tags.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                {/* Decorative Bottom Glow */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
        </motion.div>
    );
};

const ProjectDetailCard = ({ project, onClose }) => {
    const bgImage = projectImages[project.index % projectImages.length];

    return (
        <motion.div
            layoutId={`project-card-${project._id || project.index}`}
            className="relative w-full max-w-6xl h-[90vh] bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row z-50 backdrop-blur-xl"
        >
            {/* Close Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/40 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md border border-white/5 hover:rotate-90 duration-300"
            >
                <X size={24} />
            </button>

            {/* Visual Side (Left) - Image Heavy */}
            <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden bg-slate-900 group">
                <div className="absolute inset-0">
                    <img
                        src={bgImage}
                        alt="Project Cover"
                        className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent md:bg-gradient-to-r md:from-transparent md:via-slate-900/20 md:to-slate-900" />
                </div>

                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 bg-white/10 backdrop-blur-md rounded-2xl inline-flex text-white border border-white/10 mb-6 shadow-xl"
                    >
                        <FolderGit2 size={40} />
                    </motion.div>
                </div>
            </div>

            {/* Content Side (Right) */}
            <div className="flex-1 p-8 md:p-14 overflow-y-auto custom-scrollbar bg-slate-900/95 backdrop-blur-xl border-l border-white/5">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {project.title}
                    </h2>

                    <div className="flex flex-wrap gap-3 mb-10">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="px-4 py-2 text-sm font-bold text-cyan-300 bg-cyan-950/40 rounded-xl border border-cyan-500/20 shadow-sm flex items-center gap-2">
                                <Code size={14} />
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed font-light mb-12">
                        {project.description}
                        <p className="mt-4 opacity-80">
                            This project demonstrates capabilities in modern web development, focusing on performance, user experience, and scalable architecture.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-auto pt-8 border-t border-white/10">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all hover:scale-105 font-bold group"
                            >
                                <Github size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                                View Source
                            </a>
                        )}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl shadow-lg shadow-violet-500/20 transition-all hover:scale-105 font-bold"
                            >
                                <ExternalLink size={20} />
                                Live Demo
                                <ArrowRight size={18} className="opacity-70" />
                            </a>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Projects;
