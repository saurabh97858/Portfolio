// ... imports
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
// ... Lucide imports ...
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ... SpotlightCard component ...
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
            {/* Desktop Spotlight Code (Hidden on mobile interactions effectively, but we can keep it or hide it. Let's keep it but added logic below) */}
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

// ... inside Projects component ...
<motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" // UPDATED GRID
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

// ... inside ProjectCard ...
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
