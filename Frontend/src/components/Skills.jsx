import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Globe, Database, Cpu, Layout, Server, Terminal, Layers, Wrench, Shield, Smartphone, Cloud, X } from 'lucide-react';

const iconMap = {
    Frontend: Layout,
    Backend: Server,
    Database: Database,
    "Cloud & DevOps": Cloud,
    "DevOps": Cloud,
    Tools: Wrench,
    Mobile: Smartphone,
    Security: Shield,
    Languages: Code2,
    "Programming Languages": Code2,
    "Core CS": Cpu,
    "Computer Science": Cpu,
    "AI Engineering": Cpu,
    "Artificial Intelligence": Cpu,
    default: Terminal
};

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSkill, setSelectedSkill] = useState(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`);
                const data = await res.json();
                if (data.skills && data.skills.length > 0) {
                    setSkills(data.skills);
                } else {
                    setSkills([]);
                }
            } catch (error) {
                console.error("Failed to fetch skills", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono animate-pulse">Initializing Arsenal...</div>;

    return (
        <section id="skills" className="min-h-screen bg-slate-950 pt-28 pb-20 relative font-sans">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px] -z-10 opacity-60 animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 opacity-60 animate-pulse" style={{ animationDuration: '10s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0)_0%,rgba(2,6,23,0.8)_100%)] z-0" />
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                    style={{ filter: selectedSkill ? 'blur(10px)' : 'none', transition: 'filter 0.3s' }}
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md shadow-lg">
                        Expertise
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4 drop-shadow-2xl">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Arsenal</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        Explore the dimensions of my technical capabilities.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8"
                    style={{ filter: selectedSkill ? 'blur(10px)' : 'none', transition: 'filter 0.3s' }}
                >
                    {skills.map((skill, index) => (
                        <SkillCard
                            key={index}
                            skill={skill}
                            variants={cardVariants}
                            onClick={() => setSelectedSkill(skill)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Full Screen Overlay */}
            <AnimatePresence>
                {selectedSkill && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSkill(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <SkillDetailCard skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

const SkillCard = ({ skill, variants, onClick }) => {
    const IconComponent = iconMap[skill.category] || iconMap.default;

    const getGradient = (cat) => {
        const gradients = {
            Frontend: 'from-cyan-500 to-blue-600',
            Backend: 'from-violet-600 to-indigo-600',
            Database: 'from-emerald-500 to-teal-600',
            Tools: 'from-orange-500 to-red-600',
            Mobile: 'from-pink-500 to-rose-600',
            "AI Engineering": 'from-fuchsia-500 to-purple-600',
            "Computer Science": 'from-amber-400 to-orange-500',
            "Cloud & DevOps": 'from-sky-400 to-indigo-500',
            "Programming Languages": 'from-lime-400 to-green-600',
            default: 'from-slate-700 to-slate-600'
        };
        return gradients[skill.category] || gradients.default;
    };

    const gradient = getGradient(skill.category);

    return (
        <motion.div
            layoutId={`card-${skill.category}`}
            variants={variants}
            onClick={onClick} /* IMPORTANT: Clicking this triggers navigation to detail view */
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative w-full h-full cursor-pointer min-h-[300px]"
        >
            {/* Hover Glow Effect */}
            <motion.div
                className={`absolute -inset-0.5 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 rounded-[2.2rem] blur transition duration-500`}
            />

            <motion.div
                className="relative h-full bg-slate-900/60 border border-white/10 p-8 rounded-[2rem] backdrop-blur-2xl transition-all duration-300 group-hover:bg-slate-900/80 overflow-hidden flex flex-col shadow-2xl"
            >
                {/* Background Decor Icon */}
                <div className="absolute -bottom-10 -right-10 text-white/[0.03] transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700 ease-in-out">
                    <IconComponent size={180} />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} bg-opacity-20 flex items-center justify-center shadow-lg shadow-black/20 border border-white/10 mb-6 group-hover:scale-110 transition-transform`}>
                        <IconComponent size={32} className="text-white drop-shadow-md" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-colors">
                        {skill.category}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm tracking-wide uppercase mb-auto">{skill.subtitle || "Tech Stack"}</p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                        <span>Tap to expand</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const SkillDetailCard = ({ skill, onClose }) => {
    const IconComponent = iconMap[skill.category] || iconMap.default;

    const getGradient = (cat) => {
        const gradients = {
            Frontend: 'from-cyan-500 to-blue-600',
            Backend: 'from-violet-600 to-indigo-600',
            Database: 'from-emerald-500 to-teal-600',
            Tools: 'from-orange-500 to-red-600',
            Mobile: 'from-pink-500 to-rose-600',
            "AI Engineering": 'from-fuchsia-500 to-purple-600',
            "Computer Science": 'from-amber-400 to-orange-500',
            "Cloud & DevOps": 'from-sky-400 to-indigo-500',
            "Programming Languages": 'from-lime-400 to-green-600',
            default: 'from-slate-700 to-slate-600'
        };
        return gradients[skill.category] || gradients.default;
    };
    const gradient = getGradient(skill.category);

    return (
        <motion.div
            layoutId={`card-${skill.category}`} /* Shared element for smooth transition */
            className="relative w-full max-w-5xl h-[85vh] bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row z-50"
        >
            {/* Close Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/40 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md border border-white/5 hover:rotate-90 duration-300"
            >
                <X size={24} />
            </button>

            {/* Visual Side (Left) */}
            <div className={`relative md:w-5/12 p-10 flex flex-col justify-between overflow-hidden bg-gradient-to-br ${gradient}`}>
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

                {/* Giant Background Icon */}
                <div className="absolute -bottom-20 -left-20 text-white/20 transform rotate-12 scale-150 origin-bottom-left">
                    <IconComponent size={400} />
                </div>

                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl mb-8"
                    >
                        <IconComponent size={48} className="text-white" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-6xl font-black text-white leading-tight mb-4"
                    >
                        {skill.category}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/80 font-medium text-xl uppercase tracking-wide"
                    >
                        {skill.subtitle}
                    </motion.p>
                </div>

                {/* Mastery Bar Large */}
                <div className="relative z-10 mt-12 mb-8 md:mb-0">
                    <div className="flex items-end gap-3 mb-3">
                        <span className="text-7xl font-bold text-white tracking-tighter">{skill.mastery}</span>
                        <span className="text-3xl font-medium text-white/70 mb-2">%</span>
                    </div>

                    <div className="w-full bg-black/30 rounded-full h-4 p-1 backdrop-blur-sm border border-white/10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.mastery}%` }}
                            transition={{ delay: 0.5, duration: 1.2, ease: 'circOut' }}
                            className="h-full rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                        />
                    </div>
                    <p className="text-white/60 text-sm mt-3 font-medium uppercase tracking-wider">Proficiency Level</p>
                </div>
            </div>

            {/* Content Side (Right) */}
            <div className="flex-1 p-8 md:p-14 overflow-y-auto custom-scrollbar bg-slate-950/95 backdrop-blur-xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                        <span className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
                        Technical Proficiency
                    </h3>

                    <div className="flex flex-wrap gap-4 content-start">
                        {skill.items.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + (i * 0.05) }}
                                className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group cursor-default flex items-center gap-3 hover:scale-105 duration-300"
                            >
                                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_8px_rgba(255,255,255,0.5)]`} />
                                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors text-lg">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 pt-12 border-t border-white/5">
                        <blockquote className="text-slate-500 italic text-lg leading-relaxed border-l-4 border-white/10 pl-6">
                            "Continuously expanding my knowledge in <span className="text-slate-300 not-italic font-semibold">{skill.category}</span> to build scalable, robust, and industry-leading solutions."
                        </blockquote>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Skills;
