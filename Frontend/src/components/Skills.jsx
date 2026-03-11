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
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                >
                    {skills.map((skill, index) => {
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
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} p-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 ring-1 ring-white/20`}>
                                        <IconComponent size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white tracking-tight uppercase group-hover:text-cyan-400 transition-colors">
                                            {skill.category}
                                        </h3>
                                        <div className="h-0.5 w-12 rounded-full bg-white/10 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-cyan-500 transition-all duration-700 mt-1" />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {skill.items.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-slate-400 text-xs md:text-sm font-semibold hover:bg-white/10 hover:border-violet-500/30 hover:text-white transition-all duration-300 cursor-default shadow-sm hover:shadow-violet-500/10"
                                        >
                                            {item}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
