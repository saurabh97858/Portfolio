import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Database, Cpu, Layout, Server, Terminal, Layers, Wrench, Shield, Smartphone, Cloud } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

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
    const { portfolioData, loading } = usePortfolio();
    const skills = portfolioData?.skills || [];


    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };


    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono animate-pulse">Initializing Arsenal...</div>;

    return (
        <section id="skills" className="bg-slate-950 pb-4 md:pb-8 relative font-sans overflow-hidden">
            {/* SPACER: Micro-tuned for minimal gap */}
            <div className="w-full h-8 md:h-12 shrink-0" aria-hidden="true" />

            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px] -z-10 opacity-60 animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 opacity-60 animate-pulse" style={{ animationDuration: '10s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0)_0%,rgba(2,6,23,0.8)_100%)] z-0" />
            </div>

            <div className="layout-wrapper relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-6"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-3 backdrop-blur-md shadow-lg">
                        Expertise
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-2xl">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Arsenal</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
                        Explore the dimensions of my technical capabilities.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col gap-2"
                >
                    {skills.map((skill, index) => (
                        <SkillRow
                            key={index}
                            skill={skill}
                            index={index}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const SkillRow = ({ skill, index }) => {
    const IconComponent = iconMap[skill.category] || iconMap.default;
    const gradients = {
        Frontend: 'from-cyan-400 to-blue-500',
        Backend: 'from-violet-500 to-fuchsia-500',
        Database: 'from-emerald-400 to-teal-500',
        Tools: 'from-orange-400 to-red-500',
        Mobile: 'from-pink-400 to-rose-500',
        "AI Engineering": 'from-fuchsia-400 to-purple-500',
        "Computer Science": 'from-amber-300 to-orange-400',
        "Cloud & DevOps": 'from-sky-300 to-indigo-400',
        "Programming Languages": 'from-lime-300 to-green-500',
        default: 'from-slate-600 to-slate-500'
    };
    const gradient = gradients[skill.category] || gradients.default;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group relative w-full"
        >
            <div className="relative overflow-hidden bg-slate-900/30 border border-white/5 rounded-xl backdrop-blur-xl p-3 md:p-5 transition-all duration-300 hover:bg-slate-900/50 hover:border-white/10 flex flex-col md:flex-row md:items-center gap-3 md:gap-7 group-hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]">

                {/* Background Accent */}
                <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br ${gradient} opacity-[0.02] rounded-full blur-3xl group-hover:opacity-[0.05] transition-opacity duration-700`} />

                {/* Header: Icon & Category */}
                <div className="flex items-center gap-4 min-w-[160px] md:w-[220px]">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} p-2.5 flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-500 ring-1 ring-white/20`}>
                        <IconComponent size={22} className="text-white drop-shadow-md" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-[15px] font-black text-white/90 tracking-wide group-hover:text-white transition-colors uppercase">
                            {skill.category}
                        </h3>
                        <div className="h-0.5 w-8 rounded-full bg-white/10 group-hover:bg-cyan-500/50 transition-all duration-500 mt-1" />
                    </div>
                </div>

                {/* Body: Skills Cloud */}
                <div className="flex-1 flex flex-wrap gap-1.5 md:gap-2">
                    {skill.items.map((item, i) => (
                        <motion.span
                            key={i}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-slate-400 text-[10px] md:text-xs font-bold hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200 cursor-default select-none uppercase tracking-wider"
                        >
                            {item}
                        </motion.span>
                    ))}
                </div>

                {/* Footer: Mastery Metric */}
                <div className="flex flex-col items-end gap-1.5 min-w-[130px] md:w-[180px] pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                    <div className="flex items-end gap-1 mb-0.5">
                        <span className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient} drop-shadow-sm`}>
                            {skill.mastery}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-tighter">% Mastery</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden p-[1px] ring-1 ring-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.mastery}%` }}
                            transition={{ duration: 1.5, ease: "circOut", delay: 0.3 }}
                            className={`h-full rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Skills;
