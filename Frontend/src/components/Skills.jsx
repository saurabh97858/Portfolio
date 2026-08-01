import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Cloud, Cpu, Sparkles, Layers, CheckCircle2, Code2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
    Frontend: Layout,
    Backend: Server,
    Database: Database,
    "Cloud & DevOps": Cloud,
    "DevOps & Tools": Cloud,
    DevOps: Cloud,
    Tools: Cloud,
    "AI & Automation": Cpu,
    "AI Engineering": Cpu,
    "Full Stack Development": Layers,
    default: Code2
};

const categoryImages = {
    Frontend: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop",
    Backend: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&auto=format&fit=crop",
    Database: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=400&auto=format&fit=crop",
    "DevOps & Tools": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=400&auto=format&fit=crop",
    "AI & Automation": "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=400&auto=format&fit=crop",
    "Full Stack Development": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
    default: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop"
};

const categoryGradients = {
    Frontend: {
        iconBg: "from-cyan-500 to-blue-600",
        pillHover: "hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(34,211,238,0.2)]",
    },
    Backend: {
        iconBg: "from-violet-500 to-purple-600",
        pillHover: "hover:border-violet-400 hover:text-violet-300 hover:shadow-[0_0_12px_rgba(139,92,246,0.2)]",
    },
    Database: {
        iconBg: "from-emerald-500 to-teal-600",
        pillHover: "hover:border-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_12px_rgba(52,211,153,0.2)]",
    },
    "DevOps & Tools": {
        iconBg: "from-sky-500 to-indigo-600",
        pillHover: "hover:border-sky-400 hover:text-sky-300 hover:shadow-[0_0_12px_rgba(56,189,248,0.2)]",
    },
    "AI & Automation": {
        iconBg: "from-fuchsia-500 to-pink-600",
        pillHover: "hover:border-fuchsia-400 hover:text-fuchsia-300 hover:shadow-[0_0_12px_rgba(232,121,249,0.2)]",
    },
    "Full Stack Development": {
        iconBg: "from-amber-500 to-orange-600",
        pillHover: "hover:border-amber-400 hover:text-amber-300 hover:shadow-[0_0_12px_rgba(251,191,36,0.2)]",
    },
    default: {
        iconBg: "from-slate-600 to-slate-700",
        pillHover: "hover:border-slate-400 hover:text-white",
    }
};

const Skills = () => {
    const { portfolioData, loading } = usePortfolio();
    const skills = portfolioData?.skills || [];

    if (loading) {
        return (
            <div className="min-h-[40vh] bg-transparent flex items-center justify-center text-white font-mono animate-pulse">
                Loading Technical Arsenal...
            </div>
        );
    }

    return (
        <section id="skills" className="bg-transparent py-20 md:py-28 my-10 relative font-sans overflow-hidden">
            {/* Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] -z-10 animate-pulse" />
                <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] -z-10 animate-pulse" />
            </div>

            <div className="layout-wrapper relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-md">
                        <Sparkles size={14} className="text-cyan-400" />
                        EXPERTISE
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Arsenal</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
                        Explore the dimensions of my technical capabilities.
                    </p>
                </motion.div>

                {/* Skills Grid - Ample Bottom Clearance so NO text is ever cut off! */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skillGroup, index) => {
                        const IconComponent = iconMap[skillGroup.category] || iconMap.default;
                        const styleTheme = categoryGradients[skillGroup.category] || categoryGradients.default;
                        const categoryPic = categoryImages[skillGroup.category] || categoryImages.default;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="group relative rounded-3xl bg-slate-900/50 border border-slate-800/90 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 shadow-2xl flex flex-col justify-between overflow-hidden"
                            >
                                {/* Category Header Banner with Image Background */}
                                <div className="relative w-full h-28 overflow-hidden bg-slate-950">
                                    <img
                                        src={categoryPic}
                                        alt={skillGroup.category}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40 mix-blend-luminosity"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                                    
                                    <div className="absolute bottom-3 left-5 right-5 flex items-center gap-3">
                                        <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${styleTheme.iconBg} text-white shadow-lg shrink-0`}>
                                            <IconComponent size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                                                {skillGroup.category}
                                            </h3>
                                            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                                                {skillGroup.items?.length || 0} Core Technologies
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Body with Generous Internal Padding */}
                                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                                    
                                    {/* Skill Pills */}
                                    <div className="flex flex-wrap gap-2.5 pb-4">
                                        {skillGroup.items?.map((item, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ scale: 1.05 }}
                                                className={`px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800/90 text-slate-300 text-xs font-medium transition-all duration-300 cursor-default flex items-center gap-1.5 ${styleTheme.pillHover}`}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                                {item}
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Footer Indicator - Ample Clearance from Bottom Border! */}
                                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                                        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                                            <CheckCircle2 size={13} />
                                            Production Verified
                                        </span>
                                        <span className="uppercase tracking-widest text-slate-400 font-bold">PRO LEVEL</span>
                                    </div>

                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Skills;
