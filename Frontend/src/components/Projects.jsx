import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, FolderGit2, Star, GitFork, X, Code, Layers, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { usePortfolio } from '../context/PortfolioContext';

const projectImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2946&auto=format&fit=crop"
];

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const SpotlightCard = ({ children, className = "" }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                "group/spotlight relative border border-white/10 bg-slate-900/50 rounded-xl overflow-hidden",
                className
            )}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="hidden md:block pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
                style={{
                    background: useMotionTemplate`
        radial-gradient(
            650px circle at ${mouseX}px ${mouseY}px,
            rgba(139, 92, 246, 0.15),
            transparent 80%
        )
        `,
                }}
            />
            {/* Mobile Fallback: Subtle static gradient always visible */}
            <div className="md:hidden pointer-events-none absolute -inset-px rounded-xl opacity-100 bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-600/20 transition-opacity" />

            {children}
        </div>
    );
};

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
        <section id="projects" className="bg-slate-950 pb-6 md:pb-12 relative font-sans overflow-hidden">
            {/* SPACER: Micro-tuned for minimal gap */}
            <div className="w-full h-12 md:h-16 shrink-0" aria-hidden="true" />

            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[1000px] h-[1000px] bg-violet-600/5 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDuration: '15s' }} />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDuration: '12s' }} />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0)_0%,rgba(2,6,23,0.8)_100%)] z-0" />
            </div>

            <div className="container mx-auto px-3 md:px-12 max-w-5xl relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                    style={{ filter: selectedProject ? 'blur(10px)' : 'none', transition: 'filter 0.3s' }}
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md shadow-lg">
                        Portfolio
                    </span>
                    <h2 className="text-xl md:text-3xl font-black text-white tracking-tight mb-4 drop-shadow-2xl">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Works</span>
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        A curated selection of technical challenges and creative solutions.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8" // UPDATED GRID
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
                        {/* Placeholder for ProjectDetailCard if it exists, otherwise just a modal */}
                        {/* Note: In previous context, ProjectDetailCard wasn't clearly defined but used. Assuming it exists or I should define a simple one if missing. 
                             Given the corruption, I'll create a simple inline version or assume it's imported if I had seen imports. 
                             Wait, I don't see ProjectDetailCard import in the snippet I saw. I will define a simple one here or assume it's not crucial for this repair step if it was missing.
                             Actually, let's include a basic one to be safe. */}
                        <div className="bg-slate-900 p-8 rounded-2xl max-w-2xl w-full relative z-50 border border-white/10">
                            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-white"><X /></button>
                            <h2 className="text-2xl font-bold text-white mb-4">{selectedProject.title}</h2>
                            <img src={projectImages[selectedProject.index % projectImages.length]} className="w-full h-48 object-cover rounded-xl mb-4" />
                            <p className="text-slate-300 mb-4">{selectedProject.description}</p>
                            <div className="flex gap-2">
                                {selectedProject.githubLink && <a href={selectedProject.githubLink} target="_blank" className="flex items-center gap-2 text-violet-400"><Github size={16} /> Code</a>}
                                {selectedProject.liveLink && <a href={selectedProject.liveLink} target="_blank" className="flex items-center gap-2 text-cyan-400"><ExternalLink size={16} /> Live</a>}
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

const ProjectCard = ({ project, variants, onClick, index }) => {
    const bgImage = projectImages[index % projectImages.length];

    return (
        <motion.div
            layoutId={`project-card-${project._id || index}`}
            variants={variants}
            onClick={onClick}
            whileHover={{ y: -8 }}
            className="h-full"
        >
            <SpotlightCard className="h-full flex flex-col p-5 md:p-6 rounded-[1.5rem] cursor-pointer group hover:border-violet-500/30 transition-colors shadow-xl bg-slate-900/80 backdrop-blur-xl">
                {/* Background Image (Subtle) */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-[1.5rem]">
                    <img
                        src={bgImage}
                        alt="Project Background"
                        className="w-full h-full object-cover opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 scale-105 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                    {/* Top: Icon & Status */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-white/5 rounded-xl text-violet-400 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FolderGit2 size={24} />
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all">
                            View Details
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6 flex-1">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors line-clamp-1">
                            {project.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                            {project.description}
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-white/5 rounded-md border border-white/5">
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs text-slate-500">+ {project.tags.length - 3}</span>
                        )}
                    </div>
                </div>
            </SpotlightCard>
        </motion.div>
    );
};

export default Projects;
